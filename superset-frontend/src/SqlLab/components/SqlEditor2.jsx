import React from 'react';
import { connect } from 'react-redux';
import rison from 'rison';
import PropTypes from 'prop-types';
import { SupersetClient, t } from '@superset-ui/core';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const propTypes = {
    databases: PropTypes.object,
}

const defaultProps = {
    databases: null,
}

function fetchSchemas(databaseId, databaseName) {
    const queryParams = rison.encode({
        force: true,
    });
    const endpoint = `/api/v1/database/${databaseId}/schemas/?q=${queryParams}`;
    return SupersetClient.get({ endpoint })
        .then(({ json }) => {
            const options = json.result.map((s) => ({
                value: s,
                label: s,
                title: s,
            }));
            console.log(databaseName);
            console.log('schemas:');
            console.log(options);
        })
        .catch(() => {
            console.log(t('Error while fetching schema list'));
        });
}

class SqlEditor2 extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const items = Object.keys(this.props.databases).map(db => {
            const db_name =
                this.props.databases[db].database_name;
            const db_id = this.props.databases[db].explore_database_id;
            console.log("database name:");
            console.log(db_name);
            return (
                <ListGroupItem action onClick={() => fetchSchemas(db_id, db_name)}>
                    {db_name}
                </ListGroupItem>
            );
        });
        return (
            <ListGroup>
                {items}
            </ListGroup>
        )
    }
}
SqlEditor2.defaultProps = defaultProps;
SqlEditor2.propTypes = propTypes;

export default connect(null, null)(SqlEditor2);