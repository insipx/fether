// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import React, { Component } from 'react';
import { chainName$, withoutLoading } from '@parity/light.js';
import { inject, observer } from 'mobx-react';
import light from '@parity/light.js-react';
import { withProps } from 'recompose';

import RequireHealthOverlay from '../../RequireHealthOverlay';
import check from '../../assets/img/icons/check.svg';
import loading from '../../assets/img/icons/loading.svg';
import withTokens from '../../utils/withTokens';
import { SentModal } from './SentModal';

@light({
  chainName: () => chainName$().pipe(withoutLoading())
})
@inject('sendStore')
@withTokens
@withProps(({ match: { params: { tokenAddress } }, tokens }) => ({
  token: tokens[tokenAddress]
}))
@observer
class Sent extends Component {
  componentWillMount () {
    // If we refresh on this page, return to homepage
    if (!this.props.sendStore.txStatus) {
      this.handleGoToHomepage();
    }
  }

  handleGoToHomepage = () => {
    const { history, sendStore } = this.props;
    sendStore.clear();
    history.push('/');
  };

  render () {
    const { chainName, sendStore, token } = this.props;

    return (
      <RequireHealthOverlay require='connected' fullscreen>
        <div className='window_content'>
          <SentModal
            confirmationsCount={sendStore.confirmations}
            chainName={chainName}
            check={check}
            handleGoToHomepage={this.handleGoToHomepage}
            loading={loading}
            token={token}
            txStatus={sendStore.txStatus}
          />
        </div>
      </RequireHealthOverlay>
    );
  }
}

export default Sent;
