import gql from 'graphql-tag';

export const AddOrUpdateSectionMutation = gql`
    mutation (
        $id: String,
        $name: String!,
        $modules: String!
    ) {
        addOrUpdateSection(
            section: {
                id: $id,
                name: $name,
                modules: $modules
            }
        ) {
            id
        }
    }
`;

export const AddOrUpdateSectionItemMutation = gql`
    mutation (
        $id: String,
        $section: String!,
        $parentId: String!,
        $pathUrl: String!,
        $pathName: String!,
        $name: String!
        $alias: String!
    ) {
        addOrUpdateSectionItem(
            sectionItem: {
                id: $id,
                section: $section,
                parentId: $parentId,
                pathUrl: $pathUrl,
                pathName: $pathName,
                name: $name,
                alias: $alias
            }
        ){
            id
        }
    }
`;