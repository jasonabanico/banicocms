export class EmbedService {
  public filterEmbedding(input: string): string {
    let regex = /\{\{(.*?)\}\}/g;
    let result = input.replace(regex, "");
    return result;
  }

  public getEmbeds(input: string): string[] {
    let regex = /\{\{(.*?)\}\}/g;
    let match = input.match(regex);
    if (match) {
      let result = Array.from(match);
      return result;
    }

    return [];
  }
}
