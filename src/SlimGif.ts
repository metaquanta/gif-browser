import { Gif } from './generated/giphy';

export type SlimGif = {
    originalUrl: string
    fixedWidthUrl: string
    width: number
    height: number
    id: string
};

export function slim(fatGif: Gif): SlimGif {
    return {
        originalUrl: fatGif.images?.original?.url || "",
        fixedWidthUrl: fatGif.images?.fixedWidth?.url || "",
        width: Number.parseInt(fatGif.images?.fixedWidth?.width || "0"),
        height: Number.parseInt(fatGif.images?.fixedWidth?.height || "0"),
        id: fatGif.id || ""
    }
}