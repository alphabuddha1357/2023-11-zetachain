// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./interfaces/zContract.sol";
import "./interfaces/IZRC20.sol";

/**
 * @dev Custom errors for SystemContract
 */
interface SystemContractErrors {
    error CallerIsNotFungibleModule();
    error InvalidTarget();
    error CantBeIdenticalAddresses();
    error CantBeZeroAddress();
    error ZeroAddress();
}

/**
 * @dev The system contract it's called by the protocol to interact with the blockchain.
 * Also includes a lot of tools to make easier to interact with ZetaChain.
 */
contract SystemContract is SystemContractErrors {
    /// @notice Map to know the gas price of each chain given a chain id.
    //todo gasprice=>chainid
    mapping(uint256 => uint256) public gasPriceByChainId;
    /// @notice Map to know the ZRC20 address of a token given a chain id, ex zETH, zBNB etc.
    //todo chainid=>zrc20 gas coin
    mapping(uint256 => address) public gasCoinZRC20ByChainId;
    // @dev: Map to know uniswap V2 pool of ZETA/ZRC20 given a chain id. This refer to the build in uniswap deployed at genesis.
    //chainid=>pool address? uniswap pool zeta and gastoken?
    mapping(uint256 => address) public gasZetaPoolByChainId;

    //todo on zeta protocol level?
    /// @notice Fungible address is always the same, it's on protocol level.
    address public constant FUNGIBLE_MODULE_ADDRESS = 0x735b14BB79463307AAcBED86DAf3322B1e6226aB;
    /// @notice Uniswap V2 addresses.
    address public immutable uniswapv2FactoryAddress;
    address public immutable uniswapv2Router02Address;
    /// @notice Address of the wrapped ZETA to interact with Uniswap V2.
    address public wZetaContractAddress;
    /// @notice Address of ZEVM Zeta Connector.
    //todo also connecotr?for other contract read this?not used in this contract
    address public zetaConnectorZEVMAddress;

    /// @notice Custom SystemContract errors.
    event SystemContractDeployed();
    event SetGasPrice(uint256, uint256);
    event SetGasCoin(uint256, address);
    event SetGasZetaPool(uint256, address);
    event SetWZeta(address);
    event SetConnectorZEVM(address);

    //todo need check this fungible module contract
    /**
     * @dev Only fungible module can deploy a system contract.
     */
    //todo only fugible address can deploy
    //todo add check input param address 0
    constructor(address wzeta_, address uniswapv2Factory_, address uniswapv2Router02_) {
        if (msg.sender != FUNGIBLE_MODULE_ADDRESS) revert CallerIsNotFungibleModule();
        wZetaContractAddress = wzeta_;
        uniswapv2FactoryAddress = uniswapv2Factory_;
        uniswapv2Router02Address = uniswapv2Router02_;
        emit SystemContractDeployed();
    }

    /**
     * @dev Deposit foreign coins into ZRC20 and call user specified contract on zEVM.
     * @param context, context data for deposit.
     * @param zrc20, zrc20 address for deposit.
     * @param amount, amount to deposit.
     * @param target, contract address to make a call after deposit.
     * @param message, calldata for a call.
     */
    function depositAndCall(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        address target,
        bytes calldata message
    ) external {
        if (msg.sender != FUNGIBLE_MODULE_ADDRESS) revert CallerIsNotFungibleModule();
        if (target == FUNGIBLE_MODULE_ADDRESS || target == address(this)) revert InvalidTarget();

        //todo module call this function,zrc20 deposit?
        //todo check deposit?
        IZRC20(zrc20).deposit(target, amount);
        //todo what target? reentrance?
        zContract(target).onCrossChainCall(context, zrc20, amount, message);
    }

    /**
     * @dev Sort token addresses lexicographically. Used to handle return values from pairs sorted in the order.
     * @param tokenA, tokenA address.
     * @param tokenB, tokenB address.
     * @return token0 token1, returns sorted token addresses,.
     */
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        if (tokenA == tokenB) revert CantBeIdenticalAddresses();
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        //todo check first may save gas?
        if (token0 == address(0)) revert CantBeZeroAddress();
    }

    /**
     * @dev Calculates the CREATE2 address for a pair without making any external calls.
     * @param factory, factory address.
     * @param tokenA, tokenA address.
     * @param tokenB, tokenB address.
     * @return pair tokens pair address.
     */
    function uniswapv2PairFor(address factory, address tokenA, address tokenB) public pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            hex"ff",
                            factory,
                            keccak256(abi.encodePacked(token0, token1)),
                            //todo this systemcontract should be upgradeble,for the future found some bug in solidity,a chain depend on one contract is not a good framework
                            hex"96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f" // init code hash
                        )
                    )
                )
            )
        );
    }

    /**
     * @dev Fungible module updates the gas price oracle periodically.
     * @param chainID, chain id.
     * @param price, new gas price.
     */
    function setGasPrice(uint256 chainID, uint256 price) external {
        if (msg.sender != FUNGIBLE_MODULE_ADDRESS) revert CallerIsNotFungibleModule();
        gasPriceByChainId[chainID] = price;
        emit SetGasPrice(chainID, price);
    }

    /**
     * @dev Setter for gasCoinZRC20ByChainId map.
     * @param chainID, chain id.
     * @param zrc20, ZRC20 address.
     */
    function setGasCoinZRC20(uint256 chainID, address zrc20) external {
        if (msg.sender != FUNGIBLE_MODULE_ADDRESS) revert CallerIsNotFungibleModule();
        gasCoinZRC20ByChainId[chainID] = zrc20;
        emit SetGasCoin(chainID, zrc20);
    }

    /**
     * @dev Set the pool wzeta/erc20 address.
     * @param chainID, chain id.
     * @param erc20, pair for uniswap wzeta/erc20.
     */
    function setGasZetaPool(uint256 chainID, address erc20) external {
        if (msg.sender != FUNGIBLE_MODULE_ADDRESS) revert CallerIsNotFungibleModule();
        //todo make sure erc20 is aeth etc...
        address pool = uniswapv2PairFor(uniswapv2FactoryAddress, wZetaContractAddress, erc20);
        gasZetaPoolByChainId[chainID] = pool;
        emit SetGasZetaPool(chainID, pool);
    }

    /**
     * @dev Setter for wrapped ZETA address.
     * @param addr, wzeta new address.
     */
    function setWZETAContractAddress(address addr) external {
        if (msg.sender != FUNGIBLE_MODULE_ADDRESS) revert CallerIsNotFungibleModule();
        if (addr == address(0)) revert ZeroAddress();
        wZetaContractAddress = addr;
        emit SetWZeta(wZetaContractAddress);
    }

    /**
     * @dev Setter for zetaConnector ZEVM Address
     * @param addr, zeta connector new address.
     */
    function setConnectorZEVMAddress(address addr) external {
        if (msg.sender != FUNGIBLE_MODULE_ADDRESS) revert CallerIsNotFungibleModule();
        if (addr == address(0)) revert ZeroAddress();
        zetaConnectorZEVMAddress = addr;
        emit SetConnectorZEVM(zetaConnectorZEVMAddress);
    }
}
