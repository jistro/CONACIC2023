-include .env

.PHONY: all help install format anvil compile

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

help:
	@echo "Makefile for Smart-Contract"
	@echo "Usage:"
	@echo "  make install    install dependencies"
	@echo "  make format     format code"
	@echo "  make anvil      run anvil"
	@echo "  make compile    compile contracts"
	@echo "  make deployTest deploy test contracts"
	@echo "  make deployAlbitrum deploy test contracts in Albitrum goerli testnet"

all: clean remove install update build

install:
	@echo "Not implemented yet"

format :; forge fmt

anvil :
	@echo "Starting Anvil, remember use another terminal to run tests"
	@anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

ALBITRUM_TESTNET_ARGS := --rpc-url $(ALBITRUM_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ALBITRUM_API_KEY) -vvvv

compile:
	forge compile

deployTest:
	@echo "--==Deploying test contracts in ==--"
	@forge script script/GuessBook.s.sol:GuessBookScript $(NETWORK_ARGS)

deployAlbitrum:
	@echo "--==Deploying test contracts in Albitrum goerli testnet==--"
	@forge script script/GuessBook.s.sol:GuessBookScript $(ALBITRUM_TESTNET_ARGS)



