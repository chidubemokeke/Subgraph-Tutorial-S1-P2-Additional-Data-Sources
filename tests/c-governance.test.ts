import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { NewAdmin } from "../generated/schema";
import { NewAdmin as NewAdminEvent } from "../generated/CGovernance/CGovernance";
import { handleNewAdmin } from "../src/mappings/c-governance";
import { createNewAdminEvent } from "./c-governance-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let oldAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let newAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let newNewAdminEvent = createNewAdminEvent(oldAdmin, newAdmin);
    handleNewAdmin(newNewAdminEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewAdmin created and stored", () => {
    assert.entityCount("NewAdmin", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewAdmin",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldAdmin",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "NewAdmin",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newAdmin",
      "0x0000000000000000000000000000000000000001"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
