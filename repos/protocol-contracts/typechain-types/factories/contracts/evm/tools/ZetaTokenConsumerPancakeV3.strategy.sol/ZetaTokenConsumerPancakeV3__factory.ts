/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ZetaTokenConsumerPancakeV3,
  ZetaTokenConsumerPancakeV3Interface,
} from "../../../../../contracts/evm/tools/ZetaTokenConsumerPancakeV3.strategy.sol/ZetaTokenConsumerPancakeV3";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "zetaToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "pancakeV3Router_",
        type: "address",
      },
      {
        internalType: "address",
        name: "uniswapV3Factory_",
        type: "address",
      },
      {
        internalType: "address",
        name: "WETH9Address_",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "zetaPoolFee_",
        type: "uint24",
      },
      {
        internalType: "uint24",
        name: "tokenPoolFee_",
        type: "uint24",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ErrorSendingETH",
    type: "error",
  },
  {
    inputs: [],
    name: "InputCantBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "EthExchangedForZeta",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "TokenExchangedForZeta",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "ZetaExchangedForEth",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "ZetaExchangedForToken",
    type: "event",
  },
  {
    inputs: [],
    name: "WETH9Address",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "zetaTokenAmount",
        type: "uint256",
      },
    ],
    name: "getEthFromZeta",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "outputToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "zetaTokenAmount",
        type: "uint256",
      },
    ],
    name: "getTokenFromZeta",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
    ],
    name: "getZetaFromEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "inputToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "inputTokenAmount",
        type: "uint256",
      },
    ],
    name: "getZetaFromToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "hasZetaLiquidity",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pancakeV3Router",
    outputs: [
      {
        internalType: "contract ISwapRouterPancake",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPoolFee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV3Factory",
    outputs: [
      {
        internalType: "contract IUniswapV3Factory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zetaPoolFee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zetaToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6101406040523480156200001257600080fd5b506040516200288c3803806200288c83398181016040528101906200003891906200028a565b600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff161480620000a05750600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16145b80620000d85750600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16145b80620001105750600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b1562000148576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff1660e08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508473ffffffffffffffffffffffffffffffffffffffff166101008173ffffffffffffffffffffffffffffffffffffffff1660601b815250508373ffffffffffffffffffffffffffffffffffffffff166101208173ffffffffffffffffffffffffffffffffffffffff1660601b815250508273ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508162ffffff1660808162ffffff1660e81b815250508062ffffff1660a08162ffffff1660e81b81525050505050505050620003a2565b6000815190506200026d816200036e565b92915050565b600081519050620002848162000388565b92915050565b60008060008060008060c08789031215620002aa57620002a962000369565b5b6000620002ba89828a016200025c565b9650506020620002cd89828a016200025c565b9550506040620002e089828a016200025c565b9450506060620002f389828a016200025c565b93505060806200030689828a0162000273565b92505060a06200031989828a0162000273565b9150509295509295509295565b600062000333826200033a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062ffffff82169050919050565b600080fd5b620003798162000326565b81146200038557600080fd5b50565b62000393816200035a565b81146200039f57600080fd5b50565b60805160e81c60a05160e81c60c05160601c60e05160601c6101005160601c6101205160601c6123b6620004d660003960008181610d340152610d7f01526000818161045c0152818161067c015281816107a8015281816109b401528181610b13015281816110f80152818161124401526113530152600081816103ae0152818161054e015281816107350152818161096a015281816109d601528181610a2901528181610ddc015281816110ae0152818161111a015261116d015260008181610372015281816106f301528181610a6501528181610bc001528181610dbb015281816111af01526113770152600081816106d201528181610d5801526111d00152600081816103ea015281816107140152818161089d01528181610aa101528181610dfd015261118e01526123b66000f3fe6080604052600436106100a05760003560e01c80635b549182116100645780635b549182146101ac5780635d9dfdde146101d757806380801f8414610202578063a53fb10b1461022d578063c27745dd1461026a578063c469cf1414610295576100a7565b8063013b2ff8146100ac57806321e093b1146100dc5780632405620a146101075780633cbd70051461014457806354c49a2a1461016f576100a7565b366100a757005b600080fd5b6100c660048036038101906100c191906118c0565b6102c0565b6040516100d39190612030565b60405180910390f35b3480156100e857600080fd5b506100f161054c565b6040516100fe9190611dd3565b60405180910390f35b34801561011357600080fd5b5061012e60048036038101906101299190611900565b610570565b60405161013b9190612030565b60405180910390f35b34801561015057600080fd5b5061015961089b565b6040516101669190612015565b60405180910390f35b34801561017b57600080fd5b5061019660048036038101906101919190611967565b6108bf565b6040516101a39190612030565b60405180910390f35b3480156101b857600080fd5b506101c1610d32565b6040516101ce9190611f1b565b60405180910390f35b3480156101e357600080fd5b506101ec610d56565b6040516101f99190612015565b60405180910390f35b34801561020e57600080fd5b50610217610d7a565b6040516102249190611ee5565b60405180910390f35b34801561023957600080fd5b50610254600480360381019061024f9190611900565b610f6b565b6040516102619190612030565b60405180910390f35b34801561027657600080fd5b5061027f611351565b60405161028c9190611f00565b60405180910390f35b3480156102a157600080fd5b506102aa611375565b6040516102b79190611dd3565b60405180910390f35b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610328576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000341415610363576040517fb813f54900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006040518060e001604052807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1681526020017f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1681526020017f000000000000000000000000000000000000000000000000000000000000000062ffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff168152602001348152602001848152602001600073ffffffffffffffffffffffffffffffffffffffff16815250905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166304e45aaf34846040518363ffffffff1660e01b81526004016104b49190611ffa565b6020604051808303818588803b1580156104cd57600080fd5b505af11580156104e1573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906105069190611a14565b90507f87890b0a30955b1db16cc894fbe24779ae05d9f337bfe8b6dfc0809b5bf9da11348260405161053992919061204b565b60405180910390a1809250505092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806105d85750600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b1561060f576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082141561064a576040517fb813f54900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106773330848673ffffffffffffffffffffffffffffffffffffffff16611399909392919063ffffffff16565b6106c27f0000000000000000000000000000000000000000000000000000000000000000838573ffffffffffffffffffffffffffffffffffffffff166114229092919063ffffffff16565b60006040518060800160405280857f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000604051602001610768959493929190611d48565b60405160208183030381529060405281526020018773ffffffffffffffffffffffffffffffffffffffff16815260200184815260200186815250905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663b858183f836040518263ffffffff1660e01b81526004016107ff9190611fd8565b602060405180830381600087803b15801561081957600080fd5b505af115801561082d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108519190611a14565b90507f017190d3d99ee6d8dd0604ef1e71ff9802810c6485f57c9b2ed6169848dd119f85858360405161088693929190611eae565b60405180910390a18092505050949350505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610927576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000821415610962576040517fb813f54900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6109af3330847f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16611399909392919063ffffffff16565b610a1a7f0000000000000000000000000000000000000000000000000000000000000000837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166114229092919063ffffffff16565b60006040518060e001604052807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1681526020017f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1681526020017f000000000000000000000000000000000000000000000000000000000000000062ffffff1681526020013073ffffffffffffffffffffffffffffffffffffffff168152602001848152602001858152602001600073ffffffffffffffffffffffffffffffffffffffff16815250905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166304e45aaf836040518263ffffffff1660e01b8152600401610b6a9190611ffa565b602060405180830381600087803b158015610b8457600080fd5b505af1158015610b98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbc9190611a14565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632e1a7d4d826040518263ffffffff1660e01b8152600401610c179190612030565b600060405180830381600087803b158015610c3157600080fd5b505af1158015610c45573d6000803e3d6000fd5b505050507f74e171117e91660f493740924d8bad0caf48dc4fbccb767fb05935397a2c17ae8482604051610c7a92919061204b565b60405180910390a160008673ffffffffffffffffffffffffffffffffffffffff1682604051610ca890611dbe565b60006040518083038185875af1925050503d8060008114610ce5576040519150601f19603f3d011682016040523d82523d6000602084013e610cea565b606091505b5050905080610d25576040517f3794aeaf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8193505050509392505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631698ee827f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000006040518463ffffffff1660e01b8152600401610e3a93929190611e17565b60206040518083038186803b158015610e5257600080fd5b505afa158015610e66573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8a9190611893565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610ecb576000915050610f68565b600081905060008173ffffffffffffffffffffffffffffffffffffffff16631a6865026040518163ffffffff1660e01b815260040160206040518083038186803b158015610f1857600080fd5b505afa158015610f2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5091906119e7565b6fffffffffffffffffffffffffffffffff1611925050505b90565b60008060009054906101000a900460ff1615610fb3576040517f29f745a700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016000806101000a81548160ff021916908315150217905550600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806110345750600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b1561106b576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008214156110a6576040517fb813f54900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6110f33330847f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16611399909392919063ffffffff16565b61115e7f0000000000000000000000000000000000000000000000000000000000000000837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166114229092919063ffffffff16565b600060405180608001604052807f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000089604051602001611204959493929190611d48565b60405160208183030381529060405281526020018773ffffffffffffffffffffffffffffffffffffffff16815260200184815260200186815250905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663b858183f836040518263ffffffff1660e01b815260040161129b9190611fd8565b602060405180830381600087803b1580156112b557600080fd5b505af11580156112c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ed9190611a14565b90507f0a7cb8f6e1d29e616c1209a3f418c17b3a9137005377f6dd072217b1ede2573b85858360405161132293929190611eae565b60405180910390a1809250505060008060006101000a81548160ff021916908315150217905550949350505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b61141c846323b872dd60e01b8585856040516024016113ba93929190611e4e565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611580565b50505050565b60008114806114bb575060008373ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e30856040518363ffffffff1660e01b8152600401611469929190611dee565b60206040518083038186803b15801561148157600080fd5b505afa158015611495573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114b99190611a14565b145b6114fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f190611fb8565b60405180910390fd5b61157b8363095ea7b360e01b8484604051602401611519929190611e85565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611580565b505050565b60006115e2826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166116479092919063ffffffff16565b9050600081511115611642578080602001905181019061160291906119ba565b611641576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161163890611f98565b60405180910390fd5b5b505050565b6060611656848460008561165f565b90509392505050565b6060824710156116a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169b90611f58565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516116cd9190611da7565b60006040518083038185875af1925050503d806000811461170a576040519150601f19603f3d011682016040523d82523d6000602084013e61170f565b606091505b50915091506117208783838761172c565b92505050949350505050565b6060831561178f5760008351141561178757611747856117a2565b611786576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161177d90611f78565b60405180910390fd5b5b82905061179a565b61179983836117c5565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000825111156117d85781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161180c9190611f36565b60405180910390fd5b60008135905061182481612324565b92915050565b60008151905061183981612324565b92915050565b60008151905061184e8161233b565b92915050565b60008151905061186381612352565b92915050565b60008135905061187881612369565b92915050565b60008151905061188d81612369565b92915050565b6000602082840312156118a9576118a86121db565b5b60006118b78482850161182a565b91505092915050565b600080604083850312156118d7576118d66121db565b5b60006118e585828601611815565b92505060206118f685828601611869565b9150509250929050565b6000806000806080858703121561191a576119196121db565b5b600061192887828801611815565b945050602061193987828801611869565b935050604061194a87828801611815565b925050606061195b87828801611869565b91505092959194509250565b6000806000606084860312156119805761197f6121db565b5b600061198e86828701611815565b935050602061199f86828701611869565b92505060406119b086828701611869565b9150509250925092565b6000602082840312156119d0576119cf6121db565b5b60006119de8482850161183f565b91505092915050565b6000602082840312156119fd576119fc6121db565b5b6000611a0b84828501611854565b91505092915050565b600060208284031215611a2a57611a296121db565b5b6000611a388482850161187e565b91505092915050565b611a4a816120b7565b82525050565b611a59816120b7565b82525050565b611a70611a6b826120b7565b6121a5565b82525050565b611a7f816120c9565b82525050565b6000611a9082612074565b611a9a818561208a565b9350611aaa818560208601612172565b611ab3816121e0565b840191505092915050565b6000611ac982612074565b611ad3818561209b565b9350611ae3818560208601612172565b80840191505092915050565b611af88161212a565b82525050565b611b078161213c565b82525050565b6000611b188261207f565b611b2281856120a6565b9350611b32818560208601612172565b611b3b816121e0565b840191505092915050565b6000611b536026836120a6565b9150611b5e8261220b565b604082019050919050565b6000611b7660008361209b565b9150611b818261225a565b600082019050919050565b6000611b99601d836120a6565b9150611ba48261225d565b602082019050919050565b6000611bbc602a836120a6565b9150611bc782612286565b604082019050919050565b6000611bdf6036836120a6565b9150611bea826122d5565b604082019050919050565b60006080830160008301518482036000860152611c128282611a85565b9150506020830151611c276020860182611a41565b506040830151611c3a6040860182611d2a565b506060830151611c4d6060860182611d2a565b508091505092915050565b60e082016000820151611c6e6000850182611a41565b506020820151611c816020850182611a41565b506040820151611c946040850182611cf5565b506060820151611ca76060850182611a41565b506080820151611cba6080850182611d2a565b5060a0820151611ccd60a0850182611d2a565b5060c0820151611ce060c0850182611ce6565b50505050565b611cef816120f1565b82525050565b611cfe81612111565b82525050565b611d0d81612111565b82525050565b611d24611d1f82612111565b6121c9565b82525050565b611d3381612120565b82525050565b611d4281612120565b82525050565b6000611d548288611a5f565b601482019150611d648287611d13565b600382019150611d748286611a5f565b601482019150611d848285611d13565b600382019150611d948284611a5f565b6014820191508190509695505050505050565b6000611db38284611abe565b915081905092915050565b6000611dc982611b69565b9150819050919050565b6000602082019050611de86000830184611a50565b92915050565b6000604082019050611e036000830185611a50565b611e106020830184611a50565b9392505050565b6000606082019050611e2c6000830186611a50565b611e396020830185611a50565b611e466040830184611d04565b949350505050565b6000606082019050611e636000830186611a50565b611e706020830185611a50565b611e7d6040830184611d39565b949350505050565b6000604082019050611e9a6000830185611a50565b611ea76020830184611d39565b9392505050565b6000606082019050611ec36000830186611a50565b611ed06020830185611d39565b611edd6040830184611d39565b949350505050565b6000602082019050611efa6000830184611a76565b92915050565b6000602082019050611f156000830184611aef565b92915050565b6000602082019050611f306000830184611afe565b92915050565b60006020820190508181036000830152611f508184611b0d565b905092915050565b60006020820190508181036000830152611f7181611b46565b9050919050565b60006020820190508181036000830152611f9181611b8c565b9050919050565b60006020820190508181036000830152611fb181611baf565b9050919050565b60006020820190508181036000830152611fd181611bd2565b9050919050565b60006020820190508181036000830152611ff28184611bf5565b905092915050565b600060e08201905061200f6000830184611c58565b92915050565b600060208201905061202a6000830184611d04565b92915050565b60006020820190506120456000830184611d39565b92915050565b60006040820190506120606000830185611d39565b61206d6020830184611d39565b9392505050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b60006120c2826120f1565b9050919050565b60008115159050919050565b60006fffffffffffffffffffffffffffffffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062ffffff82169050919050565b6000819050919050565b60006121358261214e565b9050919050565b60006121478261214e565b9050919050565b600061215982612160565b9050919050565b600061216b826120f1565b9050919050565b60005b83811015612190578082015181840152602081019050612175565b8381111561219f576000848401525b50505050565b60006121b0826121b7565b9050919050565b60006121c2826121fe565b9050919050565b60006121d4826121f1565b9050919050565b600080fd5b6000601f19601f8301169050919050565b60008160e81b9050919050565b60008160601b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b50565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b7f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60008201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000602082015250565b61232d816120b7565b811461233857600080fd5b50565b612344816120c9565b811461234f57600080fd5b50565b61235b816120d5565b811461236657600080fd5b50565b61237281612120565b811461237d57600080fd5b5056fea2646970667358221220440acfbcec2279fe2b907a835fb3458100ce201f08e557c041994c899fec6aa864736f6c63430008070033";

type ZetaTokenConsumerPancakeV3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZetaTokenConsumerPancakeV3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZetaTokenConsumerPancakeV3__factory extends ContractFactory {
  constructor(...args: ZetaTokenConsumerPancakeV3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    zetaToken_: PromiseOrValue<string>,
    pancakeV3Router_: PromiseOrValue<string>,
    uniswapV3Factory_: PromiseOrValue<string>,
    WETH9Address_: PromiseOrValue<string>,
    zetaPoolFee_: PromiseOrValue<BigNumberish>,
    tokenPoolFee_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZetaTokenConsumerPancakeV3> {
    return super.deploy(
      zetaToken_,
      pancakeV3Router_,
      uniswapV3Factory_,
      WETH9Address_,
      zetaPoolFee_,
      tokenPoolFee_,
      overrides || {}
    ) as Promise<ZetaTokenConsumerPancakeV3>;
  }
  override getDeployTransaction(
    zetaToken_: PromiseOrValue<string>,
    pancakeV3Router_: PromiseOrValue<string>,
    uniswapV3Factory_: PromiseOrValue<string>,
    WETH9Address_: PromiseOrValue<string>,
    zetaPoolFee_: PromiseOrValue<BigNumberish>,
    tokenPoolFee_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      zetaToken_,
      pancakeV3Router_,
      uniswapV3Factory_,
      WETH9Address_,
      zetaPoolFee_,
      tokenPoolFee_,
      overrides || {}
    );
  }
  override attach(address: string): ZetaTokenConsumerPancakeV3 {
    return super.attach(address) as ZetaTokenConsumerPancakeV3;
  }
  override connect(signer: Signer): ZetaTokenConsumerPancakeV3__factory {
    return super.connect(signer) as ZetaTokenConsumerPancakeV3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZetaTokenConsumerPancakeV3Interface {
    return new utils.Interface(_abi) as ZetaTokenConsumerPancakeV3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZetaTokenConsumerPancakeV3 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ZetaTokenConsumerPancakeV3;
  }
}
