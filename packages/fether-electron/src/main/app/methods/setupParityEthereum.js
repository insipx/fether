// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import ParityEthereum from '../parityEthereum';

function setupParityEthereum (fetherApp) {
  // Download, install, and run Parity Ethereum if not running and requested
  const parityEthereumInstance = new ParityEthereum();
  parityEthereumInstance.setup(fetherApp.window);
}

export default setupParityEthereum;
