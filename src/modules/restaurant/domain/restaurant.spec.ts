import Id from "../../@shared/domain/value-object/id.value-object";
import Restaurant from "./restaurant.entity";

describe("restaurant unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let _restaurant = new Restaurant({
        id: "" as unknown as Id,
        name: "John",
        phone: "123",
        description: "abv",
        address: "yyy",
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError("restaurant: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let _restaurant = new Restaurant({
        id: new Id("123"),
        name: "",
        phone: "123",
        description: "abv",
        address: "yyy",
      });
    }).toThrowError("restaurant: Name is required");
  });

  it("should throw error when name is and id are empty", () => {
    expect(() => {
      let _restaurant = new Restaurant({
        id: "" as unknown as Id,
        name: "",
        phone: "123",
        description: "abv",
        address: "yyy",
      });
    }).toThrowError("restaurant: Id is required,restaurant: Name is required");
  });

  it("should change name", () => {
    // Arrange
    const restaurant = new Restaurant({
      id: new Id("123"),
      name: "John",
      phone: "123",
      description: "abv",
      address: "yyy"
    });

    // Act
    restaurant.changeName("Jane");
    restaurant.changePhone("changed");

    // Assert
    expect(restaurant.name).toBe("Jane");
    expect(restaurant.phone).toBe("changed");
  });
});
