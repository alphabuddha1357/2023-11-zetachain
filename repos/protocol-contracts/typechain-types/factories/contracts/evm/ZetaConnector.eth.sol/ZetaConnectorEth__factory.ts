/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ZetaConnectorEth,
  ZetaConnectorEthInterface,
} from "../../../../contracts/evm/ZetaConnector.eth.sol/ZetaConnectorEth";

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
        name: "tssAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "tssAddressUpdater_",
        type: "address",
      },
      {
        internalType: "address",
        name: "pauserAddress_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "CallerIsNotPauser",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "CallerIsNotTss",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "CallerIsNotTssOrUpdater",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "CallerIsNotTssUpdater",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxSupply",
        type: "uint256",
      },
    ],
    name: "ExceedsMaxSupply",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZetaTransferError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "callerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTssAddress",
        type: "address",
      },
    ],
    name: "PauserAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "callerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTssAddress",
        type: "address",
      },
    ],
    name: "TSSAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "callerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTssUpdaterAddress",
        type: "address",
      },
    ],
    name: "TSSAddressUpdaterUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "zetaTxSenderAddress",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "sourceChainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "zetaValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "internalSendHash",
        type: "bytes32",
      },
    ],
    name: "ZetaReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "zetaTxSenderAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sourceChainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "destinationChainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "destinationAddress",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remainingZetaValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "internalSendHash",
        type: "bytes32",
      },
    ],
    name: "ZetaReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sourceTxOriginAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "zetaTxSenderAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "destinationChainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "destinationAddress",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "zetaValueAndGas",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "destinationGasLimit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "zetaParams",
        type: "bytes",
      },
    ],
    name: "ZetaSent",
    type: "event",
  },
  {
    inputs: [],
    name: "getLockedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "zetaTxSenderAddress",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "sourceChainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "zetaValue",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "internalSendHash",
        type: "bytes32",
      },
    ],
    name: "onReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "zetaTxSenderAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sourceChainId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "destinationAddress",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "destinationChainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingZetaValue",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "internalSendHash",
        type: "bytes32",
      },
    ],
    name: "onRevert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    name: "pauserAddress",
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
    inputs: [],
    name: "renounceTssAddressUpdater",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "destinationChainId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "destinationAddress",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "destinationGasLimit",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "zetaValueAndGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "zetaParams",
            type: "bytes",
          },
        ],
        internalType: "struct ZetaInterfaces.SendInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tssAddress",
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
    inputs: [],
    name: "tssAddressUpdater",
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
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pauserAddress_",
        type: "address",
      },
    ],
    name: "updatePauserAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tssAddress_",
        type: "address",
      },
    ],
    name: "updateTssAddress",
    outputs: [],
    stateMutability: "nonpayable",
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
] as const;

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620020e6380380620020e6833981810160405281019062000037919062000284565b8383838360008060006101000a81548160ff021916908315150217905550600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480620000bd5750600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b80620000f55750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b806200012d5750600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b1562000165576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b8152505082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050505050505062000349565b6000815190506200027e816200032f565b92915050565b60008060008060808587031215620002a157620002a06200032a565b5b6000620002b1878288016200026d565b9450506020620002c4878288016200026d565b9350506040620002d7878288016200026d565b9250506060620002ea878288016200026d565b91505092959194509250565b600062000303826200030a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b6200033a81620002f6565b81146200034657600080fd5b50565b60805160601c611d62620003846000396000818161024f01528181610275015281816103b701528181610d9501526110180152611d626000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636128480f1161008c5780639122c344116100665780639122c344146101db578063942a5e16146101f7578063ec02690114610213578063f7fb869b1461022f576100ea565b80636128480f146101ab578063779e3b63146101c75780638456cb59146101d1576100ea565b8063328a01d0116100c8578063328a01d0146101475780633f4ba83a146101655780635b1125911461016f5780635c975abb1461018d576100ea565b806321e093b1146100ef578063252bc8861461010d57806329dd214d1461012b575b600080fd5b6100f761024d565b6040516101049190611883565b60405180910390f35b610115610271565b6040516101229190611af0565b60405180910390f35b6101456004803603810190610140919061153a565b610321565b005b61014f61063a565b60405161015c9190611883565b60405180910390f35b61016d610660565b005b6101776106fc565b6040516101849190611883565b60405180910390f35b610195610722565b6040516101a29190611a08565b60405180910390f35b6101c560048036038101906101c091906113fe565b610738565b005b6101cf6108ae565b005b6101d9610a89565b005b6101f560048036038101906101f091906113fe565b610b25565b005b610211600480360381019061020c919061142b565b610cf7565b005b61022d60048036038101906102289190611609565b61100c565b005b61023761119b565b6040516102449190611883565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016102cc9190611883565b60206040518083038186803b1580156102e457600080fd5b505afa1580156102f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061031c9190611652565b905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103b357336040517fff70ace20000000000000000000000000000000000000000000000000000000081526004016103aa9190611883565b60405180910390fd5b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb87876040518363ffffffff1660e01b815260040161041092919061197a565b602060405180830381600087803b15801561042a57600080fd5b505af115801561043e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610462919061150d565b90508061049b576040517f20878f6200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008484905011156105d7578573ffffffffffffffffffffffffffffffffffffffff16633749c51a6040518060a001604052808c8c8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505081526020018a81526020018973ffffffffffffffffffffffffffffffffffffffff16815260200188815260200187878080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152506040518263ffffffff1660e01b81526004016105a49190611aac565b600060405180830381600087803b1580156105be57600080fd5b505af11580156105d2573d6000803e3d6000fd5b505050505b818673ffffffffffffffffffffffffffffffffffffffff16887ff1302855733b40d8acb467ee990b6d56c05c80e28ebcabfa6e6f3f57cb50d6988c8c8a8a8a604051610627959493929190611a23565b60405180910390a4505050505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106f257336040517f4677a0d30000000000000000000000000000000000000000000000000000000081526004016106e99190611883565b60405180910390fd5b6106fa6111c1565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900460ff16905090565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107ca57336040517f4677a0d30000000000000000000000000000000000000000000000000000000081526004016107c19190611883565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610831576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fd41d83655d484bdf299598751c371b2d92088667266fe3774b25a97bdd5d039733826040516108a392919061189e565b60405180910390a150565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461094057336040517fe700765e0000000000000000000000000000000000000000000000000000000081526004016109379190611883565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156109c9576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f5104c9abdc7d111c2aeb4ce890ac70274a4be2ee83f46a62551be5e6ebc82dd033600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051610a7f92919061189e565b60405180910390a1565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b1b57336040517f4677a0d3000000000000000000000000000000000000000000000000000000008152600401610b129190611883565b60405180910390fd5b610b23611223565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614158015610bd15750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610c1357336040517fcdfcef97000000000000000000000000000000000000000000000000000000008152600401610c0a9190611883565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610c7a576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fe79965b5c67dcfb2cf5fe152715e4a7256cee62a3d5dd8484fd8a8539eb8beff3382604051610cec92919061189e565b60405180910390a150565b610cff611285565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d9157336040517fff70ace2000000000000000000000000000000000000000000000000000000008152600401610d889190611883565b60405180910390fd5b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8b876040518363ffffffff1660e01b8152600401610dee92919061197a565b602060405180830381600087803b158015610e0857600080fd5b505af1158015610e1c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e40919061150d565b905080610e79576040517f20878f6200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000848490501115610fbb578973ffffffffffffffffffffffffffffffffffffffff16633ff0693c6040518060c001604052808d73ffffffffffffffffffffffffffffffffffffffff1681526020018c81526020018b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050815260200189815260200188815260200187878080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152506040518263ffffffff1660e01b8152600401610f889190611ace565b600060405180830381600087803b158015610fa257600080fd5b505af1158015610fb6573d6000803e3d6000fd5b505050505b81867f521fb0b407c2eb9b1375530e9b9a569889992140a688bc076aa72c1712012c888c8c8c8c8b8b8b604051610ff897969594939291906119a3565b60405180910390a350505050505050505050565b611014611285565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd333085608001356040518463ffffffff1660e01b8152600401611077939291906118c7565b602060405180830381600087803b15801561109157600080fd5b505af11580156110a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110c9919061150d565b905080611102576040517f20878f6200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600001353373ffffffffffffffffffffffffffffffffffffffff167f7ec1c94701e09b1652f3e1d307e60c4b9ebf99aff8c2079fd1d8c585e031c4e4328580602001906111509190611b0b565b8760800135886040013589806060019061116a9190611b0b565b8b8060a0019061117a9190611b0b565b60405161118f999897969594939291906118fe565b60405180910390a35050565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6111c96112cf565b60008060006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61120c611318565b6040516112199190611883565b60405180910390a1565b61122b611285565b60016000806101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861126e611318565b60405161127b9190611883565b60405180910390a1565b61128d610722565b156112cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112c490611a8c565b60405180910390fd5b565b6112d7610722565b611316576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161130d90611a6c565b60405180910390fd5b565b600033905090565b60008135905061132f81611cd0565b92915050565b60008151905061134481611ce7565b92915050565b60008135905061135981611cfe565b92915050565b60008083601f84011261137557611374611c45565b5b8235905067ffffffffffffffff81111561139257611391611c40565b5b6020830191508360018202830111156113ae576113ad611c59565b5b9250929050565b600060c082840312156113cb576113ca611c4f565b5b81905092915050565b6000813590506113e381611d15565b92915050565b6000815190506113f881611d15565b92915050565b60006020828403121561141457611413611c68565b5b600061142284828501611320565b91505092915050565b600080600080600080600080600060e08a8c03121561144d5761144c611c68565b5b600061145b8c828d01611320565b995050602061146c8c828d016113d4565b98505060408a013567ffffffffffffffff81111561148d5761148c611c63565b5b6114998c828d0161135f565b975097505060606114ac8c828d016113d4565b95505060806114bd8c828d016113d4565b94505060a08a013567ffffffffffffffff8111156114de576114dd611c63565b5b6114ea8c828d0161135f565b935093505060c06114fd8c828d0161134a565b9150509295985092959850929598565b60006020828403121561152357611522611c68565b5b600061153184828501611335565b91505092915050565b60008060008060008060008060c0898b03121561155a57611559611c68565b5b600089013567ffffffffffffffff81111561157857611577611c63565b5b6115848b828c0161135f565b985098505060206115978b828c016113d4565b96505060406115a88b828c01611320565b95505060606115b98b828c016113d4565b945050608089013567ffffffffffffffff8111156115da576115d9611c63565b5b6115e68b828c0161135f565b935093505060a06115f98b828c0161134a565b9150509295985092959890939650565b60006020828403121561161f5761161e611c68565b5b600082013567ffffffffffffffff81111561163d5761163c611c63565b5b611649848285016113b5565b91505092915050565b60006020828403121561166857611667611c68565b5b6000611676848285016113e9565b91505092915050565b61168881611bac565b82525050565b61169781611bac565b82525050565b6116a681611bbe565b82525050565b60006116b88385611b8a565b93506116c5838584611bfe565b6116ce83611c6d565b840190509392505050565b60006116e482611b6e565b6116ee8185611b79565b93506116fe818560208601611c0d565b61170781611c6d565b840191505092915050565b600061171f601483611b9b565b915061172a82611c7e565b602082019050919050565b6000611742601083611b9b565b915061174d82611ca7565b602082019050919050565b600060a083016000830151848203600086015261177582826116d9565b915050602083015161178a6020860182611865565b50604083015161179d604086018261167f565b5060608301516117b06060860182611865565b50608083015184820360808601526117c882826116d9565b9150508091505092915050565b600060c0830160008301516117ed600086018261167f565b5060208301516118006020860182611865565b506040830151848203604086015261181882826116d9565b915050606083015161182d6060860182611865565b5060808301516118406080860182611865565b5060a083015184820360a086015261185882826116d9565b9150508091505092915050565b61186e81611bf4565b82525050565b61187d81611bf4565b82525050565b6000602082019050611898600083018461168e565b92915050565b60006040820190506118b3600083018561168e565b6118c0602083018461168e565b9392505050565b60006060820190506118dc600083018661168e565b6118e9602083018561168e565b6118f66040830184611874565b949350505050565b600060c082019050611913600083018c61168e565b8181036020830152611926818a8c6116ac565b90506119356040830189611874565b6119426060830188611874565b81810360808301526119558186886116ac565b905081810360a083015261196a8184866116ac565b90509a9950505050505050505050565b600060408201905061198f600083018561168e565b61199c6020830184611874565b9392505050565b600060a0820190506119b8600083018a61168e565b6119c56020830189611874565b81810360408301526119d88187896116ac565b90506119e76060830186611874565b81810360808301526119fa8184866116ac565b905098975050505050505050565b6000602082019050611a1d600083018461169d565b92915050565b60006060820190508181036000830152611a3e8187896116ac565b9050611a4d6020830186611874565b8181036040830152611a608184866116ac565b90509695505050505050565b60006020820190508181036000830152611a8581611712565b9050919050565b60006020820190508181036000830152611aa581611735565b9050919050565b60006020820190508181036000830152611ac68184611758565b905092915050565b60006020820190508181036000830152611ae881846117d5565b905092915050565b6000602082019050611b056000830184611874565b92915050565b60008083356001602003843603038112611b2857611b27611c54565b5b80840192508235915067ffffffffffffffff821115611b4a57611b49611c4a565b5b602083019250600182023603831315611b6657611b65611c5e565b5b509250929050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611bb782611bd4565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611c2b578082015181840152602081019050611c10565b83811115611c3a576000848401525b50505050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b611cd981611bac565b8114611ce457600080fd5b50565b611cf081611bbe565b8114611cfb57600080fd5b50565b611d0781611bca565b8114611d1257600080fd5b50565b611d1e81611bf4565b8114611d2957600080fd5b5056fea2646970667358221220452f0ca5e2ff6e760969e34be614f0db4512926fb92cd312f85558f640f102f164736f6c63430008070033";

type ZetaConnectorEthConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZetaConnectorEthConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZetaConnectorEth__factory extends ContractFactory {
  constructor(...args: ZetaConnectorEthConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    zetaToken_: PromiseOrValue<string>,
    tssAddress_: PromiseOrValue<string>,
    tssAddressUpdater_: PromiseOrValue<string>,
    pauserAddress_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZetaConnectorEth> {
    return super.deploy(
      zetaToken_,
      tssAddress_,
      tssAddressUpdater_,
      pauserAddress_,
      overrides || {}
    ) as Promise<ZetaConnectorEth>;
  }
  override getDeployTransaction(
    zetaToken_: PromiseOrValue<string>,
    tssAddress_: PromiseOrValue<string>,
    tssAddressUpdater_: PromiseOrValue<string>,
    pauserAddress_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      zetaToken_,
      tssAddress_,
      tssAddressUpdater_,
      pauserAddress_,
      overrides || {}
    );
  }
  override attach(address: string): ZetaConnectorEth {
    return super.attach(address) as ZetaConnectorEth;
  }
  override connect(signer: Signer): ZetaConnectorEth__factory {
    return super.connect(signer) as ZetaConnectorEth__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZetaConnectorEthInterface {
    return new utils.Interface(_abi) as ZetaConnectorEthInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZetaConnectorEth {
    return new Contract(address, _abi, signerOrProvider) as ZetaConnectorEth;
  }
}
