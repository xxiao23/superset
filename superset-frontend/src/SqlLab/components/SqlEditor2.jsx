import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const propTypes = {
    databases: PropTypes.object,
}

const defaultProps = {
    databases: null,
}

class SqlEditor2 extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const items = Object.keys(this.props.databases).map(db => {
            const db_name =
                this.props.databases[db].database_name;
            console.log(db_name);
            return (
                <ListGroupItem>{db_name}</ListGroupItem>
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