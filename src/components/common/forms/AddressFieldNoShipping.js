/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';

import InlineItems from './InlineItems';
import InputField from './InputField';
import Select from './Select';

// Translation data for this component
import intlData from './AddressFieldShipping.intl';

/**
 * Component
 */
class AddressFieldNoShipping extends React.Component {
    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    state = {
        address: this.props.address || {},
        fieldErrors: {}
    };

    componentDidMount() {
        require('./AddressFieldShipping.scss');
    }

    //*** View Controllers ***//

    handleSavedAddressChange = (idx) => {
        this.props.onSubmit(this.props.savedAddresses[idx]);
    };

    handleFieldChange = (field, value) => {
        let address = this.state.address;
        address[field] = value;
        this.setState({address: address});
    };

    setCountryAndProvinceAndName = () => {
        let address = this.state.address;
        address.state = "Chaco";
        address.country = "Argentina";
        address.city = "Resistencia";
        address.dni = "000000000";
        address.postalCode = 3500;
        console.log("checkout",this.props.checkout);
        if (this.props.checkout.customer) {
            address.name = this.props.checkout.customer.name;
            console.log("checkout",this.props.checkout);
        }
        this.setState({address: address});
    };

    handleSubmitClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        // Client-side validations
        let fieldErrors = {};

        if (!this.state.address.addressLine1) {
            fieldErrors.addressLine1 = intlStore.getMessage(intlData, 'fieldRequired');
        }

        if (!this.state.address.phone) {
            fieldErrors.phone = intlStore.getMessage(intlData, 'fieldRequired');
        }

        this.setState({fieldErrors: fieldErrors});

        // Validation passed, trigger request
        if (Object.keys(fieldErrors).length === 0) {
            this.setCountryAndProvinceAndName();
            this.props.onSubmit(this.state.address);
        }
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        let addressOptions;
        if (this.props.savedAddresses && this.props.savedAddresses.length > 0) {
            addressOptions = this.props.savedAddresses.map(function (address, idx) {
                return {
                    value: idx,
                    name: `${address.name}, ${address.addressLine1} ${address.addressLine2}, ${address.postalCode} ${address.city}`
                };
            });
        }

        return (
            <div className="address-field">
                {addressOptions ?
                    <div className="address-field__item address-field__saved-addresses">
                        <Select label={intlStore.getMessage(intlData, 'savedAddresses')}
                                labelWeight="normal"
                                labelSize="small"
                                placeholder
                                options={addressOptions}
                                onChange={this.handleSavedAddressChange} />
                    </div>
                    :
                    null
                }
                <div className="address-field__item">
                    <InlineItems>
                        <InputField label={intlStore.getMessage(intlData, 'phoneNumber')}
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.phone}
                                    onChange={this.handleFieldChange.bind(null, 'phone')}
                                    error={this.state.fieldErrors['phone']} />
                        <InputField label={intlStore.getMessage(intlData, 'addressLine2')}
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.addressLine2}
                                    onChange={this.handleFieldChange.bind(null, 'addressLine2')}
                                    error={this.state.fieldErrors['addressLine2']} />
                    </InlineItems>
                </div>
                <div className="address-field__item">
                    <InputField label={intlStore.getMessage(intlData, 'address')}
                                labelWeight={this.props.labelWeight}
                                value={this.state.address.addressLine1}
                                onChange={this.handleFieldChange.bind(null, 'addressLine1')}
                                error={this.state.fieldErrors['addressLine1']} />
                </div>
                {this.props.onCancel || this.props.onSubmit ?
                    <div className="address-field__item">
                        <InlineItems>
                            <div>
                                {this.props.onCancel ?
                                    <Button type="default"
                                            onClick={this.props.onCancel}
                                            disabled={this.props.disabled}
                                            loading={this.props.loading}>
                                        {this.props.cancelLabel || intlStore.getMessage(intlData, 'cancel')}
                                    </Button>
                                    :
                                    null
                                }
                            </div>
                            <div>
                                {this.props.onSubmit ?
                                    <Button type="primary"
                                            onClick={this.handleSubmitClick}
                                            disabled={this.props.disabled}
                                            loading={this.props.loading}>
                                        {this.props.submitLabel || intlStore.getMessage(intlData, 'submit')}
                                    </Button>
                                    :
                                    null
                                }
                            </div>
                        </InlineItems>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

/**
 * Exports
 */
export default AddressFieldNoShipping;
