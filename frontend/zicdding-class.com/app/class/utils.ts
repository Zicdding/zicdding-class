import TurndownService from 'turndown';

export const convertHTMLToMarkdown = (html: string) => {
    const turndownService = new TurndownService();
    return turndownService.turndown(html);
}
  