const Class = require("../models/Class");
const Instructor = require("../models/Instructor");
// const { classes, insructors } = require("./data");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require("graphql");

// Class Type
const ClassType = new GraphQLObjectType({
  name: "Class",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    instructor: {
      type: InstructorType,
      resolve(parent, args) {
        return Instructor.findById(parent.instructorId);
      }
    }
  })
});

// Instructor Type
const InstructorType = new GraphQLObjectType({
  name: "Instructor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    classes: {
      type: new GraphQLList(ClassType),
      resolve(parent, args) {
        return Class.find();
      }
    },
    class: {
      type: ClassType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Class.findById(args.id);
      }
    },
    instructors: {
      type: new GraphQLList(InstructorType),
      resolve(parent, args) {
        return Instructor.find();
      }
    },
    instructor: {
      type: InstructorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Instructor.findById(args.id);
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a instructor
    addInstructor: {
      type: InstructorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const instructor = new Instructor({
          name: args.name,
          email: args.email,
          phone: args.phone
        });

        return instructor.save();
      }
    },
    // Delete a instructor
    deleteInstructor: {
      type: InstructorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        Class.find({ instructorId: args.id }).then(classes => {
          classes.forEach(skatingClass => {
            skatingClass.deleteOne();
          });
        });

        return Instructor.findByIdAndDelete(args.id);
      }
    },
    // Add a skatingClass
    addClass: {
      type: ClassType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ClassStatus",
            values: {
              new: { value: "Coming Soon" },
              enrolment: { value: "Enrolment" },
              enrolment: { value: "Enrolment" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" }
            }
          }),
          defaultValue: "Coming Soon"
        },
        instructorId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const skatingClass = new Class({
          name: args.name,
          description: args.description,
          status: args.status,
          instructorId: args.instructorId
        });

        return skatingClass.save();
      }
    },
    // Delete a skatingClass
    deleteClass: {
      type: ClassType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Class.findByIdAndDelete(args.id);
      }
    },
    // Update a skatingClass
    updateClass: {
      type: ClassType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ClassStatusUpdate",
            values: {
              new: { value: "Coming Soon" },
              enrolment: { value: "Enrolment" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" }
            }
          })
        }
      },
      resolve(parent, args) {
        return Class.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status
            }
          },
          { new: true }
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
