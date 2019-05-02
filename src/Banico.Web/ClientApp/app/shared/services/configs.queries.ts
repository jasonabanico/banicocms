import gql from 'graphql-tag';

export const ConfigsQuery = gql`
    query configsQuery(
        $id: String,
        $module: String,
        $name: String
    ) {
        configs(
            id: $id,
            module: $module,
            name: $name
        ) {
            id,
            createdBy,
            createdDate,
            updatedBy,
            updatedDate,
            name,
            module,
            value
        }
    }
`;