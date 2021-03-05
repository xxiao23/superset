import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import DatabaseItem from './DatabaseItem';

const propTypes = {
    databases: PropTypes.object,
}

const defaultProps = {
    databases: null,
}

class SqlEditorLeftBar2 extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const items = Object.keys(this.props.databases).map(db => {
            const db_name =
                this.props.databases[db].database_name;
            const db_id = this.props.databases[db].explore_database_id;
            return (<DatabaseItem
                db_id={db_id}
                db_name={db_name} />);
        });
        return (
            <ListGroup>
                {items}
            </ListGroup>
        )
    }
}
SqlEditorLeftBar2.defaultProps = defaultProps;
SqlEditorLeftBar2.propTypes = propTypes;

function mapStateToProps(state, props) {
    const { sqlLab } = state;
    const queryEditor = sqlLab.queryEditors.find(
        editor => editor.id === props.queryEditorId,
    );

    return { sqlLab, ...props, queryEditor };
}

export default connect(mapStateToProps, null)(SqlEditorLeftBar2);