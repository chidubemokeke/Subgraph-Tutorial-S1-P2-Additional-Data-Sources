// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class UniGovAccount extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UniGovAccount entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UniGovAccount must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UniGovAccount", id.toString(), this);
    }
  }

  static loadInBlock(id: string): UniGovAccount | null {
    return changetype<UniGovAccount | null>(
      store.get_in_block("UniGovAccount", id),
    );
  }

  static load(id: string): UniGovAccount | null {
    return changetype<UniGovAccount | null>(store.get("UniGovAccount", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get totalApprovals(): BigInt {
    let value = this.get("totalApprovals");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalApprovals(value: BigInt) {
    this.set("totalApprovals", Value.fromBigInt(value));
  }

  get totalTransfers(): BigInt {
    let value = this.get("totalTransfers");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalTransfers(value: BigInt) {
    this.set("totalTransfers", Value.fromBigInt(value));
  }

  get delegatedVotes(): BigInt {
    let value = this.get("delegatedVotes");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set delegatedVotes(value: BigInt) {
    this.set("delegatedVotes", Value.fromBigInt(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get ownerApprovals(): UniGovApprovalLoader {
    return new UniGovApprovalLoader(
      "UniGovAccount",
      this.get("id")!.toString(),
      "ownerApprovals",
    );
  }

  get involvedTransfersFrom(): UniGovTransferLoader {
    return new UniGovTransferLoader(
      "UniGovAccount",
      this.get("id")!.toString(),
      "involvedTransfersFrom",
    );
  }

  get involvedTransfersTo(): UniGovTransferLoader {
    return new UniGovTransferLoader(
      "UniGovAccount",
      this.get("id")!.toString(),
      "involvedTransfersTo",
    );
  }
}

export class CompGovAccount extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CompGovAccount entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CompGovAccount must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("CompGovAccount", id.toString(), this);
    }
  }

  static loadInBlock(id: string): CompGovAccount | null {
    return changetype<CompGovAccount | null>(
      store.get_in_block("CompGovAccount", id),
    );
  }

  static load(id: string): CompGovAccount | null {
    return changetype<CompGovAccount | null>(store.get("CompGovAccount", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get totalApprovals(): BigInt {
    let value = this.get("totalApprovals");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalApprovals(value: BigInt) {
    this.set("totalApprovals", Value.fromBigInt(value));
  }

  get totalTransfers(): BigInt {
    let value = this.get("totalTransfers");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalTransfers(value: BigInt) {
    this.set("totalTransfers", Value.fromBigInt(value));
  }

  get delegatedVotes(): BigInt {
    let value = this.get("delegatedVotes");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set delegatedVotes(value: BigInt) {
    this.set("delegatedVotes", Value.fromBigInt(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get ownerApprovals(): CompGovApprovalLoader {
    return new CompGovApprovalLoader(
      "CompGovAccount",
      this.get("id")!.toString(),
      "ownerApprovals",
    );
  }

  get involvedTransfersFrom(): CompGovTransferLoader {
    return new CompGovTransferLoader(
      "CompGovAccount",
      this.get("id")!.toString(),
      "involvedTransfersFrom",
    );
  }

  get involvedTransfersTo(): CompGovTransferLoader {
    return new CompGovTransferLoader(
      "CompGovAccount",
      this.get("id")!.toString(),
      "involvedTransfersTo",
    );
  }
}

export class UniGovTransfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UniGovTransfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UniGovTransfer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UniGovTransfer", id.toString(), this);
    }
  }

  static loadInBlock(id: string): UniGovTransfer | null {
    return changetype<UniGovTransfer | null>(
      store.get_in_block("UniGovTransfer", id),
    );
  }

  static load(id: string): UniGovTransfer | null {
    return changetype<UniGovTransfer | null>(store.get("UniGovTransfer", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get fromAccount(): UniGovAccountLoader {
    return new UniGovAccountLoader(
      "UniGovTransfer",
      this.get("id")!.toString(),
      "fromAccount",
    );
  }

  get toAccount(): UniGovAccountLoader {
    return new UniGovAccountLoader(
      "UniGovTransfer",
      this.get("id")!.toString(),
      "toAccount",
    );
  }
}

export class CompGovTransfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CompGovTransfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CompGovTransfer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("CompGovTransfer", id.toString(), this);
    }
  }

  static loadInBlock(id: string): CompGovTransfer | null {
    return changetype<CompGovTransfer | null>(
      store.get_in_block("CompGovTransfer", id),
    );
  }

  static load(id: string): CompGovTransfer | null {
    return changetype<CompGovTransfer | null>(store.get("CompGovTransfer", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get fromAccount(): CompGovAccountLoader {
    return new CompGovAccountLoader(
      "CompGovTransfer",
      this.get("id")!.toString(),
      "fromAccount",
    );
  }

  get toAccount(): CompGovAccountLoader {
    return new CompGovAccountLoader(
      "CompGovTransfer",
      this.get("id")!.toString(),
      "toAccount",
    );
  }
}

export class UniGovApproval extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UniGovApproval entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UniGovApproval must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UniGovApproval", id.toString(), this);
    }
  }

  static loadInBlock(id: string): UniGovApproval | null {
    return changetype<UniGovApproval | null>(
      store.get_in_block("UniGovApproval", id),
    );
  }

  static load(id: string): UniGovApproval | null {
    return changetype<UniGovApproval | null>(store.get("UniGovApproval", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ownerAccount(): string | null {
    let value = this.get("ownerAccount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set ownerAccount(value: string | null) {
    if (!value) {
      this.unset("ownerAccount");
    } else {
      this.set("ownerAccount", Value.fromString(<string>value));
    }
  }

  get spender(): Bytes {
    let value = this.get("spender");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set spender(value: Bytes) {
    this.set("spender", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class CompGovApproval extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CompGovApproval entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CompGovApproval must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("CompGovApproval", id.toString(), this);
    }
  }

  static loadInBlock(id: string): CompGovApproval | null {
    return changetype<CompGovApproval | null>(
      store.get_in_block("CompGovApproval", id),
    );
  }

  static load(id: string): CompGovApproval | null {
    return changetype<CompGovApproval | null>(store.get("CompGovApproval", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ownerAccount(): string | null {
    let value = this.get("ownerAccount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set ownerAccount(value: string | null) {
    if (!value) {
      this.unset("ownerAccount");
    } else {
      this.set("ownerAccount", Value.fromString(<string>value));
    }
  }

  get spender(): Bytes {
    let value = this.get("spender");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set spender(value: Bytes) {
    this.set("spender", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class UniGovDelegateChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save UniGovDelegateChanged entity without an ID",
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UniGovDelegateChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UniGovDelegateChanged", id.toString(), this);
    }
  }

  static loadInBlock(id: string): UniGovDelegateChanged | null {
    return changetype<UniGovDelegateChanged | null>(
      store.get_in_block("UniGovDelegateChanged", id),
    );
  }

  static load(id: string): UniGovDelegateChanged | null {
    return changetype<UniGovDelegateChanged | null>(
      store.get("UniGovDelegateChanged", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegator(): Bytes {
    let value = this.get("delegator");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set delegator(value: Bytes) {
    this.set("delegator", Value.fromBytes(value));
  }

  get fromDelegate(): Bytes {
    let value = this.get("fromDelegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set fromDelegate(value: Bytes) {
    this.set("fromDelegate", Value.fromBytes(value));
  }

  get toDelegate(): Bytes {
    let value = this.get("toDelegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set toDelegate(value: Bytes) {
    this.set("toDelegate", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class CompGovDelegateChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save CompGovDelegateChanged entity without an ID",
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CompGovDelegateChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("CompGovDelegateChanged", id.toString(), this);
    }
  }

  static loadInBlock(id: string): CompGovDelegateChanged | null {
    return changetype<CompGovDelegateChanged | null>(
      store.get_in_block("CompGovDelegateChanged", id),
    );
  }

  static load(id: string): CompGovDelegateChanged | null {
    return changetype<CompGovDelegateChanged | null>(
      store.get("CompGovDelegateChanged", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegator(): Bytes {
    let value = this.get("delegator");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set delegator(value: Bytes) {
    this.set("delegator", Value.fromBytes(value));
  }

  get fromDelegate(): Bytes {
    let value = this.get("fromDelegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set fromDelegate(value: Bytes) {
    this.set("fromDelegate", Value.fromBytes(value));
  }

  get toDelegate(): Bytes {
    let value = this.get("toDelegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set toDelegate(value: Bytes) {
    this.set("toDelegate", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class UniGovDelegateVotesChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save UniGovDelegateVotesChanged entity without an ID",
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UniGovDelegateVotesChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UniGovDelegateVotesChanged", id.toString(), this);
    }
  }

  static loadInBlock(id: string): UniGovDelegateVotesChanged | null {
    return changetype<UniGovDelegateVotesChanged | null>(
      store.get_in_block("UniGovDelegateVotesChanged", id),
    );
  }

  static load(id: string): UniGovDelegateVotesChanged | null {
    return changetype<UniGovDelegateVotesChanged | null>(
      store.get("UniGovDelegateVotesChanged", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get previousBalance(): BigInt {
    let value = this.get("previousBalance");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set previousBalance(value: BigInt) {
    this.set("previousBalance", Value.fromBigInt(value));
  }

  get newBalance(): BigInt {
    let value = this.get("newBalance");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set newBalance(value: BigInt) {
    this.set("newBalance", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class CompGovDelegateVotesChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save CompGovDelegateVotesChanged entity without an ID",
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CompGovDelegateVotesChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("CompGovDelegateVotesChanged", id.toString(), this);
    }
  }

  static loadInBlock(id: string): CompGovDelegateVotesChanged | null {
    return changetype<CompGovDelegateVotesChanged | null>(
      store.get_in_block("CompGovDelegateVotesChanged", id),
    );
  }

  static load(id: string): CompGovDelegateVotesChanged | null {
    return changetype<CompGovDelegateVotesChanged | null>(
      store.get("CompGovDelegateVotesChanged", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): Bytes {
    let value = this.get("delegate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set delegate(value: Bytes) {
    this.set("delegate", Value.fromBytes(value));
  }

  get previousBalance(): BigInt {
    let value = this.get("previousBalance");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set previousBalance(value: BigInt) {
    this.set("previousBalance", Value.fromBigInt(value));
  }

  get newBalance(): BigInt {
    let value = this.get("newBalance");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set newBalance(value: BigInt) {
    this.set("newBalance", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class UniGovApprovalLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): UniGovApproval[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<UniGovApproval[]>(value);
  }
}

export class UniGovTransferLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): UniGovTransfer[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<UniGovTransfer[]>(value);
  }
}

export class CompGovApprovalLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): CompGovApproval[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<CompGovApproval[]>(value);
  }
}

export class CompGovTransferLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): CompGovTransfer[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<CompGovTransfer[]>(value);
  }
}

export class UniGovAccountLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): UniGovAccount[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<UniGovAccount[]>(value);
  }
}

export class CompGovAccountLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): CompGovAccount[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<CompGovAccount[]>(value);
  }
}
