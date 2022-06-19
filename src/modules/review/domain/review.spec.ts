import Id from "../../@shared/domain/value-object/id.value-object";
import Review from "./review.entity";

describe("Review unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let review = new Review({
        id: "" as unknown as Id,
        clientId: "1",
        comment: "Simplesmente incrivel...",
        stars: 5,
        restaurantId: "1",
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError("review: Id is required");
  });

  it("should throw error when stars is empty", () => {
    expect(() => {
      let review = new Review({
        id: new Id("123"),
        clientId: "1",
        comment: "Simplesmente incrivel...",
        stars: undefined,
        restaurantId: "1",
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError("review: Stars is required");
  });

  it("should throw error when stars is and id are empty", () => {
    expect(() => {
      let review = new Review({
        id: "" as unknown as Id,
        clientId: "1",
        comment: "Simplesmente incrivel...",
        stars: undefined,
        restaurantId: "1",
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }).toThrowError("review: Id is required,review: Stars is required");
  });

  it("should update stars and comment", () => {
    // Arrange
    const review = new Review({
      id: new Id("123"),
      clientId: "1",
      comment: "Simplesmente incrivel...",
      stars: 4,
      restaurantId: "1",
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    // Act
    review.changeStars(5);
    review.changeComment("Muito incrível!");

    // Assert
    expect(review.stars).toBe(5);
    expect(review.comment).toBe("Muito incrível!");
  });
});
