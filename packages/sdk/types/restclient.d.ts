import { AminoTx, BaseAccount, CodeInfo, CodeInfoWithId, ContractInfo, StdTx } from "./types";
interface NodeInfo {
  readonly network: string;
}
interface NodeInfoResponse {
  readonly node_info: NodeInfo;
}
interface BlockMeta {
  readonly header: {
    readonly height: number;
    readonly time: string;
    readonly num_txs: number;
  };
  readonly block_id: {
    readonly hash: string;
  };
}
interface Block {
  readonly header: {
    readonly height: number;
  };
}
interface BlocksResponse {
  readonly block_meta: BlockMeta;
  readonly block: Block;
}
interface AuthAccountsResponse {
  readonly result: {
    readonly value: BaseAccount;
  };
}
interface WasmResponse {
  readonly result: string;
}
export interface TxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly raw_log: string;
  readonly tx: AminoTx;
}
interface SearchTxsResponse {
  readonly total_count: string;
  readonly count: string;
  readonly page_number: string;
  readonly page_total: string;
  readonly limit: string;
  readonly txs: readonly TxsResponse[];
}
interface PostTxsParams {}
interface PostTxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly code?: number;
  readonly raw_log?: string;
  /** The same as `raw_log` but deserialized? */
  readonly logs?: object;
  /** The gas limit as set by the user */
  readonly gas_wanted?: string;
  /** The gas used by the execution */
  readonly gas_used?: string;
}
interface EncodeTxResponse {
  readonly tx: string;
}
declare type RestClientResponse =
  | NodeInfoResponse
  | BlocksResponse
  | AuthAccountsResponse
  | TxsResponse
  | SearchTxsResponse
  | PostTxsResponse
  | EncodeTxResponse
  | WasmResponse;
declare type BroadcastMode = "block" | "sync" | "async";
export declare class RestClient {
  private readonly client;
  private readonly mode;
  constructor(url: string, mode?: BroadcastMode);
  get(path: string): Promise<RestClientResponse>;
  post(path: string, params: PostTxsParams): Promise<RestClientResponse>;
  nodeInfo(): Promise<NodeInfoResponse>;
  blocksLatest(): Promise<BlocksResponse>;
  blocks(height: number): Promise<BlocksResponse>;
  /** returns the amino-encoding of the transaction performed by the server */
  encodeTx(stdTx: StdTx): Promise<Uint8Array>;
  authAccounts(address: string, height?: string): Promise<AuthAccountsResponse>;
  txs(query: string): Promise<SearchTxsResponse>;
  txsById(id: string): Promise<TxsResponse>;
  postTx(tx: Uint8Array): Promise<PostTxsResponse>;
  listCodeInfo(): Promise<readonly CodeInfoWithId[]>;
  getCodeInfo(id: number): Promise<CodeInfo>;
  listContractAddresses(): Promise<readonly string[]>;
  getContractInfo(address: string): Promise<ContractInfo>;
}
export {};
