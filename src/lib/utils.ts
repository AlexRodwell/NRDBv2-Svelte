export const format_date = (iso: string, options?: Intl.DateTimeFormatOptions) => {
    const date = new Date(iso);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric'
        ...options
    });
}

export const action = async (
    action: 'download' | 'export',
    id: string,
    format: 'json' | 'txt' | 'otcgn' | 'bbcode' | 'md' | 'jinteki.net'
) => {
    const response = await fetch(
        `/api/decklist/${action}?type=decklist&id=${id}&format=${format}`
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decklist.${format}`;
    a.click();
    URL.revokeObjectURL(url);
};

export const markdown = (text: string) => {
    return text.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/^#+\s/gm, '\n$&');
}
