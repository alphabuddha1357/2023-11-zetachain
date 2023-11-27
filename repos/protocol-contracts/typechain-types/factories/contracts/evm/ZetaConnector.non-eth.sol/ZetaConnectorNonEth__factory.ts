/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ZetaConnectorNonEth,
  ZetaConnectorNonEthInterface,
} from "../../../../contracts/evm/ZetaConnector.non-eth.sol/ZetaConnectorNonEth";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "zetaTokenAddress_",
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
        name: "callerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaxSupply",
        type: "uint256",
      },
    ],
    name: "MaxSupplyUpdated",
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
    inputs: [],
    name: "maxSupply",
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
    inputs: [
      {
        internalType: "uint256",
        name: "maxSupply_",
        type: "uint256",
      },
    ],
    name: "setMaxSupply",
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
  "0x60a06040527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6003553480156200003557600080fd5b506040516200237b3803806200237b83398181016040528101906200005b9190620002a8565b8383838360008060006101000a81548160ff021916908315150217905550600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480620000e15750600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b80620001195750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b80620001515750600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b1562000189576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b8152505082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050505050506200036d565b600081519050620002a28162000353565b92915050565b60008060008060808587031215620002c557620002c46200034e565b5b6000620002d58782880162000291565b9450506020620002e88782880162000291565b9350506040620002fb8782880162000291565b92505060606200030e8782880162000291565b91505092959194509250565b600062000327826200032e565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b6200035e816200031a565b81146200036a57600080fd5b50565b60805160601c611fc5620003b66000396000818161029f015281816102c501528181610408015281816104f601528181610f5201528181611040015261126f0152611fc56000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636f8b44b011610097578063942a5e1611610066578063942a5e1614610229578063d5abeb0114610245578063ec02690114610263578063f7fb869b1461027f57610100565b80636f8b44b0146101dd578063779e3b63146101f95780638456cb59146102035780639122c3441461020d57610100565b80633f4ba83a116100d35780633f4ba83a1461017b5780635b112591146101855780635c975abb146101a35780636128480f146101c157610100565b806321e093b114610105578063252bc8861461012357806329dd214d14610141578063328a01d01461015d575b600080fd5b61010d61029d565b60405161011a9190611a78565b60405180910390f35b61012b6102c1565b6040516101389190611ce5565b60405180910390f35b61015b600480360381019061015691906116f3565b610371565b005b610165610721565b6040516101729190611a78565b60405180910390f35b610183610747565b005b61018d6107e3565b60405161019a9190611a78565b60405180910390f35b6101ab610809565b6040516101b89190611bfd565b60405180910390f35b6101db60048036038101906101d691906115e4565b61081f565b005b6101f760048036038101906101f2919061180b565b610995565b005b610201610a6a565b005b61020b610c45565b005b610227600480360381019061022291906115e4565b610ce1565b005b610243600480360381019061023e9190611611565b610eb3565b005b61024d61125f565b60405161025a9190611ce5565b60405180910390f35b61027d600480360381019061027891906117c2565b611265565b005b610287611396565b6040516102949190611a78565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161031c9190611a78565b60206040518083038186803b15801561033457600080fd5b505afa158015610348573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036c9190611838565b905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461040357336040517fff70ace20000000000000000000000000000000000000000000000000000000081526004016103fa9190611a78565b60405180910390fd5b6003547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561046c57600080fd5b505afa158015610480573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a49190611838565b856104af9190611da1565b11156104f4576003546040517f3d3dbc830000000000000000000000000000000000000000000000000000000081526004016104eb9190611ce5565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631e458bee8686846040518463ffffffff1660e01b815260040161055193929190611b61565b600060405180830381600087803b15801561056b57600080fd5b505af115801561057f573d6000803e3d6000fd5b5050505060008383905011156106bf578473ffffffffffffffffffffffffffffffffffffffff16633749c51a6040518060a001604052808b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505081526020018981526020018873ffffffffffffffffffffffffffffffffffffffff16815260200187815260200186868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152506040518263ffffffff1660e01b815260040161068c9190611ca1565b600060405180830381600087803b1580156106a657600080fd5b505af11580156106ba573d6000803e3d6000fd5b505050505b808573ffffffffffffffffffffffffffffffffffffffff16877ff1302855733b40d8acb467ee990b6d56c05c80e28ebcabfa6e6f3f57cb50d6988b8b89898960405161070f959493929190611c18565b60405180910390a45050505050505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107d957336040517f4677a0d30000000000000000000000000000000000000000000000000000000081526004016107d09190611a78565b60405180910390fd5b6107e16113bc565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900460ff16905090565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108b157336040517f4677a0d30000000000000000000000000000000000000000000000000000000081526004016108a89190611a78565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610918576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fd41d83655d484bdf299598751c371b2d92088667266fe3774b25a97bdd5d0397338260405161098a929190611a93565b60405180910390a150565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a2757336040517fff70ace2000000000000000000000000000000000000000000000000000000008152600401610a1e9190611a78565b60405180910390fd5b806003819055507f26843c619c87f9021bcc4ec5143177198076d9da3c13ce1bb2e941644c69d42e3382604051610a5f929190611b38565b60405180910390a150565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610afc57336040517fe700765e000000000000000000000000000000000000000000000000000000008152600401610af39190611a78565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610b85576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f5104c9abdc7d111c2aeb4ce890ac70274a4be2ee83f46a62551be5e6ebc82dd033600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051610c3b929190611a93565b60405180910390a1565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610cd757336040517f4677a0d3000000000000000000000000000000000000000000000000000000008152600401610cce9190611a78565b60405180910390fd5b610cdf61141e565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614158015610d8d5750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610dcf57336040517fcdfcef97000000000000000000000000000000000000000000000000000000008152600401610dc69190611a78565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610e36576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fe79965b5c67dcfb2cf5fe152715e4a7256cee62a3d5dd8484fd8a8539eb8beff3382604051610ea8929190611a93565b60405180910390a150565b610ebb611480565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f4d57336040517fff70ace2000000000000000000000000000000000000000000000000000000008152600401610f449190611a78565b60405180910390fd5b6003547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015610fb657600080fd5b505afa158015610fca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fee9190611838565b85610ff99190611da1565b111561103e576003546040517f3d3dbc830000000000000000000000000000000000000000000000000000000081526004016110359190611ce5565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631e458bee8a86846040518463ffffffff1660e01b815260040161109b93929190611b61565b600060405180830381600087803b1580156110b557600080fd5b505af11580156110c9573d6000803e3d6000fd5b50505050600083839050111561120f578873ffffffffffffffffffffffffffffffffffffffff16633ff0693c6040518060c001604052808c73ffffffffffffffffffffffffffffffffffffffff1681526020018b81526020018a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050815260200188815260200187815260200186868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152506040518263ffffffff1660e01b81526004016111dc9190611cc3565b600060405180830381600087803b1580156111f657600080fd5b505af115801561120a573d6000803e3d6000fd5b505050505b80857f521fb0b407c2eb9b1375530e9b9a569889992140a688bc076aa72c1712012c888b8b8b8b8a8a8a60405161124c9796959493929190611b98565b60405180910390a3505050505050505050565b60035481565b61126d611480565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166379cc67903383608001356040518363ffffffff1660e01b81526004016112cc929190611b38565b600060405180830381600087803b1580156112e657600080fd5b505af11580156112fa573d6000803e3d6000fd5b5050505080600001353373ffffffffffffffffffffffffffffffffffffffff167f7ec1c94701e09b1652f3e1d307e60c4b9ebf99aff8c2079fd1d8c585e031c4e43284806020019061134c9190611d00565b866080013587604001358880606001906113669190611d00565b8a8060a001906113769190611d00565b60405161138b99989796959493929190611abc565b60405180910390a350565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6113c46114ca565b60008060006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611407611513565b6040516114149190611a78565b60405180910390a1565b611426611480565b60016000806101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611469611513565b6040516114769190611a78565b60405180910390a1565b611488610809565b156114c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114bf90611c81565b60405180910390fd5b565b6114d2610809565b611511576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161150890611c61565b60405180910390fd5b565b600033905090565b60008135905061152a81611f4a565b92915050565b60008135905061153f81611f61565b92915050565b60008083601f84011261155b5761155a611ebf565b5b8235905067ffffffffffffffff81111561157857611577611eba565b5b60208301915083600182028301111561159457611593611ed3565b5b9250929050565b600060c082840312156115b1576115b0611ec9565b5b81905092915050565b6000813590506115c981611f78565b92915050565b6000815190506115de81611f78565b92915050565b6000602082840312156115fa576115f9611ee2565b5b60006116088482850161151b565b91505092915050565b600080600080600080600080600060e08a8c03121561163357611632611ee2565b5b60006116418c828d0161151b565b99505060206116528c828d016115ba565b98505060408a013567ffffffffffffffff81111561167357611672611edd565b5b61167f8c828d01611545565b975097505060606116928c828d016115ba565b95505060806116a38c828d016115ba565b94505060a08a013567ffffffffffffffff8111156116c4576116c3611edd565b5b6116d08c828d01611545565b935093505060c06116e38c828d01611530565b9150509295985092959850929598565b60008060008060008060008060c0898b03121561171357611712611ee2565b5b600089013567ffffffffffffffff81111561173157611730611edd565b5b61173d8b828c01611545565b985098505060206117508b828c016115ba565b96505060406117618b828c0161151b565b95505060606117728b828c016115ba565b945050608089013567ffffffffffffffff81111561179357611792611edd565b5b61179f8b828c01611545565b935093505060a06117b28b828c01611530565b9150509295985092959890939650565b6000602082840312156117d8576117d7611ee2565b5b600082013567ffffffffffffffff8111156117f6576117f5611edd565b5b6118028482850161159b565b91505092915050565b60006020828403121561182157611820611ee2565b5b600061182f848285016115ba565b91505092915050565b60006020828403121561184e5761184d611ee2565b5b600061185c848285016115cf565b91505092915050565b61186e81611df7565b82525050565b61187d81611df7565b82525050565b61188c81611e09565b82525050565b61189b81611e15565b82525050565b60006118ad8385611d7f565b93506118ba838584611e49565b6118c383611ee7565b840190509392505050565b60006118d982611d63565b6118e38185611d6e565b93506118f3818560208601611e58565b6118fc81611ee7565b840191505092915050565b6000611914601483611d90565b915061191f82611ef8565b602082019050919050565b6000611937601083611d90565b915061194282611f21565b602082019050919050565b600060a083016000830151848203600086015261196a82826118ce565b915050602083015161197f6020860182611a5a565b5060408301516119926040860182611865565b5060608301516119a56060860182611a5a565b50608083015184820360808601526119bd82826118ce565b9150508091505092915050565b600060c0830160008301516119e26000860182611865565b5060208301516119f56020860182611a5a565b5060408301518482036040860152611a0d82826118ce565b9150506060830151611a226060860182611a5a565b506080830151611a356080860182611a5a565b5060a083015184820360a0860152611a4d82826118ce565b9150508091505092915050565b611a6381611e3f565b82525050565b611a7281611e3f565b82525050565b6000602082019050611a8d6000830184611874565b92915050565b6000604082019050611aa86000830185611874565b611ab56020830184611874565b9392505050565b600060c082019050611ad1600083018c611874565b8181036020830152611ae4818a8c6118a1565b9050611af36040830189611a69565b611b006060830188611a69565b8181036080830152611b138186886118a1565b905081810360a0830152611b288184866118a1565b90509a9950505050505050505050565b6000604082019050611b4d6000830185611874565b611b5a6020830184611a69565b9392505050565b6000606082019050611b766000830186611874565b611b836020830185611a69565b611b906040830184611892565b949350505050565b600060a082019050611bad600083018a611874565b611bba6020830189611a69565b8181036040830152611bcd8187896118a1565b9050611bdc6060830186611a69565b8181036080830152611bef8184866118a1565b905098975050505050505050565b6000602082019050611c126000830184611883565b92915050565b60006060820190508181036000830152611c338187896118a1565b9050611c426020830186611a69565b8181036040830152611c558184866118a1565b90509695505050505050565b60006020820190508181036000830152611c7a81611907565b9050919050565b60006020820190508181036000830152611c9a8161192a565b9050919050565b60006020820190508181036000830152611cbb818461194d565b905092915050565b60006020820190508181036000830152611cdd81846119ca565b905092915050565b6000602082019050611cfa6000830184611a69565b92915050565b60008083356001602003843603038112611d1d57611d1c611ece565b5b80840192508235915067ffffffffffffffff821115611d3f57611d3e611ec4565b5b602083019250600182023603831315611d5b57611d5a611ed8565b5b509250929050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611dac82611e3f565b9150611db783611e3f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611dec57611deb611e8b565b5b828201905092915050565b6000611e0282611e1f565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611e76578082015181840152602081019050611e5b565b83811115611e85576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b611f5381611df7565b8114611f5e57600080fd5b50565b611f6a81611e15565b8114611f7557600080fd5b50565b611f8181611e3f565b8114611f8c57600080fd5b5056fea264697066735822122042c1c5ce470576da1cb902e0a0b485290cd2a9ede8320a0811545990e510647564736f6c63430008070033";

type ZetaConnectorNonEthConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZetaConnectorNonEthConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZetaConnectorNonEth__factory extends ContractFactory {
  constructor(...args: ZetaConnectorNonEthConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    zetaTokenAddress_: PromiseOrValue<string>,
    tssAddress_: PromiseOrValue<string>,
    tssAddressUpdater_: PromiseOrValue<string>,
    pauserAddress_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZetaConnectorNonEth> {
    return super.deploy(
      zetaTokenAddress_,
      tssAddress_,
      tssAddressUpdater_,
      pauserAddress_,
      overrides || {}
    ) as Promise<ZetaConnectorNonEth>;
  }
  override getDeployTransaction(
    zetaTokenAddress_: PromiseOrValue<string>,
    tssAddress_: PromiseOrValue<string>,
    tssAddressUpdater_: PromiseOrValue<string>,
    pauserAddress_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      zetaTokenAddress_,
      tssAddress_,
      tssAddressUpdater_,
      pauserAddress_,
      overrides || {}
    );
  }
  override attach(address: string): ZetaConnectorNonEth {
    return super.attach(address) as ZetaConnectorNonEth;
  }
  override connect(signer: Signer): ZetaConnectorNonEth__factory {
    return super.connect(signer) as ZetaConnectorNonEth__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZetaConnectorNonEthInterface {
    return new utils.Interface(_abi) as ZetaConnectorNonEthInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZetaConnectorNonEth {
    return new Contract(address, _abi, signerOrProvider) as ZetaConnectorNonEth;
  }
}
