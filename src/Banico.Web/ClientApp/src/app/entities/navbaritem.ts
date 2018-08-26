import { Section } from './section';
import { SectionItem } from './sectionitem';

export class NavBarItem {
    section: Section;
    sectionItem: SectionItem;
    sectionItems: SectionItem[];
    homePathUrl: string;
    pathUrls: string[];
    pathNameNodes: string[];
    showDropdown: boolean;
    childrenVisible: boolean;
}