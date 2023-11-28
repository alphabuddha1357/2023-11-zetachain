// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/ConnectorErrors.sol";
import "./ZetaConnector.base.sol";
import "./interfaces/ZetaInterfaces.sol";

/**
 * @dev ETH implementation of ZetaConnector.
 * This contract manages interactions between TSS and different chains.
 * This version is only for Ethereum network because in the other chains we mint and burn and in this one we lock and unlock.
 */
contract ZetaConnectorEth is ZetaConnectorBase {
    constructor(
        address zetaToken_,
        address tssAddress_,
        address tssAddressUpdater_,
        address pauserAddress_
    ) ZetaConnectorBase(zetaToken_, tssAddress_, tssAddressUpdater_, pauserAddress_) {}

    //todo zeta balance,may change function name?
    //todo this use balance not internal accounting?
    function getLockedAmount() external view returns (uint256) {
        return IERC20(zetaToken).balanceOf(address(this));
    }

    /**
     * @dev Entrypoint to send data through ZetaChain
     * This call locks the token on the contract and emits an event with all the data needed by the protocol.
     */
    //  struct SendInput {
    //     /// @dev Chain id of the destination chain. More about chain ids https://docs.zetachain.com/learn/glossary#chain-id
    //     uint256 destinationChainId;
    //     /// @dev Address receiving the message on the destination chain (expressed in bytes since it can be non-EVM)
    //     bytes destinationAddress;
    //     /// @dev Gas limit for the destination chain's transaction
    //     uint256 destinationGasLimit;
    //     /// @dev An encoded, arbitrary message to be parsed by the destination contract
    //     bytes message;
    //     /// @dev ZETA to be sent cross-chain + ZetaChain gas fees + destination chain gas fees (expressed in ZETA)
    //     //todo didnt differiate zeta and other erc20 token?
    //     uint256 zetaValueAndGas;
    //     /// @dev Optional parameters for the ZetaChain protocol
    //     bytes zetaParams;
    // }
    //todo check how to use in zetachain
    function send(ZetaInterfaces.SendInput calldata input) external override whenNotPaused {
        //todo wait,why only zeta?what about other asset
        bool success = IERC20(zetaToken).transferFrom(msg.sender, address(this), input.zetaValueAndGas);
        if (!success) revert ZetaTransferError();

        //todo tss read this and call onreceive in destination chain?
        emit ZetaSent(
            tx.origin,
            msg.sender,
            input.destinationChainId,
            input.destinationAddress,
            input.zetaValueAndGas,
            input.destinationGasLimit,
            input.message,
            input.zetaParams
        );
    }

    /**
     * @dev Handler to receive data from other chain.
     * This method can be called only by TSS.
     * Transfers the Zeta tokens to destination and calls onZetaMessage if it's needed.
     */
    function onReceive(
        bytes calldata zetaTxSenderAddress,
        uint256 sourceChainId,
        address destinationAddress,
        uint256 zetaValue,
        bytes calldata message,
        bytes32 internalSendHash
    ) external override onlyTssAddress {
        bool success = IERC20(zetaToken).transfer(destinationAddress, zetaValue);
        if (!success) revert ZetaTransferError();

        if (message.length > 0) {
            //todo destination's callback,is there reentrance risk?
            ZetaReceiver(destinationAddress).onZetaMessage(
                ZetaInterfaces.ZetaMessage(zetaTxSenderAddress, sourceChainId, destinationAddress, zetaValue, message)
            );
        }

        emit ZetaReceived(zetaTxSenderAddress, sourceChainId, destinationAddress, zetaValue, message, internalSendHash);
    }

    /**
     * @dev Handler to receive errors from other chain.
     * This method can be called only by TSS.
     todo fix this comment?
     * Transfers the Zeta tokens to destination and calls onZetaRevert if it's needed.
     */
    function onRevert(
        address zetaTxSenderAddress,
        uint256 sourceChainId,
        bytes calldata destinationAddress,
        uint256 destinationChainId,
        uint256 remainingZetaValue,
        bytes calldata message,
        bytes32 internalSendHash
    ) external override whenNotPaused onlyTssAddress {
        //todo transfer back to sender?
        bool success = IERC20(zetaToken).transfer(zetaTxSenderAddress, remainingZetaValue);
        if (!success) revert ZetaTransferError();

        if (message.length > 0) {
            //todo call sender's revert?
            ZetaReceiver(zetaTxSenderAddress).onZetaRevert(
                ZetaInterfaces.ZetaRevert(
                    zetaTxSenderAddress,
                    sourceChainId,
                    destinationAddress,
                    destinationChainId,
                    remainingZetaValue,
                    message
                )
            );
        }

        emit ZetaReverted(
            zetaTxSenderAddress,
            sourceChainId,
            destinationChainId,
            destinationAddress,
            remainingZetaValue,
            message,
            internalSendHash
        );
    }
}
