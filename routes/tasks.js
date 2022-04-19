const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    tasks: [
      {
        id: 1,
        title: "Add tags for solutions",
        category: "enhancement",
        upvotes: 112,
        status: "live",
        description:
          "Easier to search for solutions based on a specific stack.",
        comments: [
          {
            id: 1,
            content:
              "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
            user: {
              image: "../../assets/users/image-suzanne.jpg",
              name: "Suzanne Chang",
              username: "upbeat1811",
            },
          },
          {
            id: 2,
            content:
              "Please use fun, color-coded labels to easily identify them at a glance",
            user: {
              image: "../../assets/users/image-thomas.jpg",
              name: "Thomas Hood",
              username: "brawnybrave",
            },
          },
        ],
      },
    ],
  });
});

module.exports = router;
