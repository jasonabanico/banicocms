import gql from 'graphql-tag';

export const AddOrUpdateConfigMutation = gql`
    mutation (
        $id: String,
        $name: String!,
        $module: String,
        $value: String!
    ) {
        addOrUpdateConfig(
            config: {
                id: $id,
                name: $name,
                module: $module,
                value: $value
            }
        ) {
            id
        }
    }
`;