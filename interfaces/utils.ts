import { IncomingMessage, ServerResponse } from 'http'
import { ParsedUrlQuery } from 'querystring'

export interface Context {
    req: IncomingMessage;
    res: ServerResponse;
    params?: ParsedUrlQuery | undefined;
    query: ParsedUrlQuery;
    preview?: boolean | undefined;
    previewData?: any;
}

export type IGetAccessToken = (ctx: Context) => Promise<string | undefined>