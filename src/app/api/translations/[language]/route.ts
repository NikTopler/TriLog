import * as fs from 'fs';
import path from 'path';
import { RequestParams } from '@/types';
import { NextRequest, NextResponse } from "next/server";
import { isSupportedLanguage } from '@/helpers';

type TranslationParams = RequestParams<{
    language: string
}>;

export async function GET(req: NextRequest, { params }: TranslationParams) {

    try {

        if (!isSupportedLanguage(params.language)) {
            throw new Error("Invalid language");
        }

        const translations = {};
        const projectRoot = process.cwd();
        const folderPath = path.join(projectRoot, 'src', 'translations', params.language);

        fs.readdirSync(folderPath).forEach((file) => {
            if (path.extname(file) === '.json') {
                const fileData = fs.readFileSync(path.join(folderPath, file), 'utf8');
                const jsonData = JSON.parse(fileData);
                Object.assign(translations, jsonData);
            }
        });

        return NextResponse.json({
            success: true,
            data: translations,
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}