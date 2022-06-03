import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Review from "../domain/review.entity";
import { ReviewModel } from "./review.model";
import ReviewRepository from "./review.repository";

describe("Review repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new review", async () => {
    const props = {
      id: new Id("1"),
      clientId: 1,
      restaurantId: 1,
      stars: 4,
      comment: "Incrivel",
    };
    const review = new Review(props);
    const reviewRepository = new ReviewRepository();

    await reviewRepository.create(review);

    const reviewDb = await ReviewModel.findOne({
      where: { id: props.id.id },
    });

    expect(props.id.id).toBe(reviewDb.id);
    expect(props.stars).toBe(reviewDb.stars);
    expect(props.comment).toBe(reviewDb.comment);
    expect(props.clientId).toBe(reviewDb.clientId);
    expect(props.restaurantId).toBe(reviewDb.restaurantId);
  });
  it("should find a review", async () => {
    ReviewModel.create({
      id: "1",
      clientId: 1,
      restaurantId: 1,
      stars: 4,
      comment: "Incrivel",
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    const reviewRepository = new ReviewRepository();

    const review = await reviewRepository.find("1");

    expect(review.id.id).toEqual("1");
    expect(review.clientId).toEqual(1);
    expect(review.restaurantId).toEqual(1);
    expect(review.stars).toEqual(4);
    expect(review.comment).toEqual("Incrivel");
  });
  it("should update a review", async () => {
    const reviewRepository = new ReviewRepository();
    const review = new Review({
      id: new Id("123"),
      clientId: 1,
      restaurantId: 1,
      stars: 4,
      comment: "Incrivel",
    });
    await reviewRepository.create(review);

    review.changeComment("Comment updated");
    review.changeStars(2);

    await reviewRepository.update(review);
    const updatedReview = await ReviewModel.findOne({
      where: { id: "123" },
    });

    expect(updatedReview.comment).toEqual("Comment updated");
    expect(updatedReview.id).toEqual("123");
    expect(updatedReview.stars).toEqual(2);
    expect(updatedReview.clientId).toEqual(1);
    expect(updatedReview.restaurantId).toEqual(1);
  });
  it("should find all reviews", async () => {
    const reviewRepository = new ReviewRepository();
    const review = new Review({
      id: new Id("1"),
      clientId: 1,
      restaurantId: 1,
      stars: 4,
      comment: "Incrivel",
    });
    const review2 = new Review({
      id: new Id("2"),
      clientId: 1,
      restaurantId: 1,
      stars: 4,
      comment: "Incrivel",
    });
    await reviewRepository.create(review);
    await reviewRepository.create(review2);

    const allReviews = await ReviewModel.findAll();

    expect(allReviews).toHaveLength(2);
    expect(allReviews[0].id).toEqual(review.id.id);
    expect(allReviews[0].clientId).toEqual(review.clientId);
    expect(allReviews[0].restaurantId).toEqual(review.restaurantId);
    expect(allReviews[0].stars).toEqual(review.stars);
    expect(allReviews[0].comment).toEqual(review.comment);
    expect(allReviews[1].id).toStrictEqual(review2.id.id);
    expect(allReviews[1].clientId).toEqual(review2.clientId);
    expect(allReviews[1].restaurantId).toEqual(review2.restaurantId);
    expect(allReviews[1].stars).toEqual(review2.stars);
    expect(allReviews[1].comment).toEqual(review2.comment);
  });
});
