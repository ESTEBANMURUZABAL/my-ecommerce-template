/**
 * Imports
 */
import React from 'react';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

/**
 * Component
 */
class MainNavigation extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./MainNavigation.scss');
    }

    //*** Template ***//

    render() {

        // Base route params
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};
        let textClass = undefined;
        if ('admin'.indexOf(this.props.menutype) != -1) {
            textClass = `main-navigation__item-regular`;
        } else {
            textClass = 'main-navigation__item-admin';
        }

        // Return
        return (
            <div className="main-navigation">
                <nav>
                    <ul>
                        {this.props.links.map(function (link, idx) {
                            return (
                                <li key={idx} className={textClass}>
                                    <Link to={link.to} params={Object.assign(link.params || {}, routeParams)}>
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        );
    }
}

/**
 * Exports
 */
export default MainNavigation;
