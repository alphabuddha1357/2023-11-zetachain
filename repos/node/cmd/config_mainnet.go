//go:build !PRIVNET && !TESTNET && !MOCK_MAINNET
// +build !PRIVNET,!TESTNET,!MOCK_MAINNET

package cmd

const (
	Bech32PrefixAccAddr         = "zeta"
	Bech32PrefixAccPub          = "zetapub"
	Bech32PrefixValAddr         = "zetav"
	Bech32PrefixValPub          = "zetavpub"
	Bech32PrefixConsAddr        = "zetac"
	Bech32PrefixConsPub         = "zetacpub"
	DenomRegex                  = `[a-zA-Z][a-zA-Z0-9:\\/\\\-\\_\\.]{2,127}`
	ZetaChainCoinType    uint32 = 60
	//todo is this ethereum's path?
	//todo report this?
	ZetaChainHDPath string = `m/44'/60'/0'/0/0`
)
