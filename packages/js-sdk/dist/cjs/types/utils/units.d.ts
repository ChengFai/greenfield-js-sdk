import { SimulateResponse } from '@bnb-chain/greenfield-cosmos-types/cosmos/tx/v1beta1/service';
import { ISimulateGasFee } from '..';
export declare const getGasFeeBySimulate: (simulateTxInfo: SimulateResponse, denom?: string) => ISimulateGasFee;
