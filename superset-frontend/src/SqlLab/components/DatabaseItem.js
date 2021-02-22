import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Collapse, ListGroup, ListGroupItem } from 'react-bootstrap';

import {
    fetchDatabaseSchemas
} from '../actions/sqlLab';

const propTypes = {
    schemas: PropTypes.array,
}

const defaultProps = {
    schemas: [],
}

function DatabaseItem(props) {
    const [open, setOpen] = useState(false);
    console.log('DatabaseItem props:');
    console.log(props);
    const schema_divs = (
        <ul>
            {props.schemas && props.schemas.length
                ? props.schemas.map((schema, index) => {
                    return <li key={`schema-${props.db_id}-${index}`}>{schema.value}</li>;
                  })
                : "No schemas"}
        </ul>
    );

    return (
        <>
            <ListGroupItem action onClick={() => {
                console.log(open);
                setOpen(!open);
                props.fetchDatabaseSchemas(props.db_id, props.db_name);
            }}>
                {props.db_name}
            </ListGroupItem>
            <Collapse in={open}>
                {schema_divs}
            </Collapse>
        </>
    );
}

DatabaseItem.defaultProps = defaultProps;
DatabaseItem.propTypes = propTypes;

function mapStateToProps(state, props) {
    const { sqlLab } = state;
    const schemas = sqlLab.schemasByDb[props.db_id];
    return { sqlLab, ...props, schemas };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchDatabaseSchemas,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseItem);