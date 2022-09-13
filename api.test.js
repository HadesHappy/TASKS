const request = require("supertest")

const baseURL = "https://localhost:4000/tasks"

// describe("GET /get-task", () => {
//     // const newTask = {
//     //     id: "7686be",
//     //     title: "write react code",
//     //     date: "2022/9/13",
//     // }
//     // beforeAll(async () => {
//     //     await (await request(baseURL).post("/create-task")).send(newTask);
//     // });
//     // afterAll(async () => {
//     //     await request(baseURL).delete(`/delete-task/${newTask.id}`)
//     // });
//     it("should return 200", async () => {
//         const response = await request(baseURL).get(`/get-task/${newTask.id}`);
//         // expect(response.statusCode).toBe(200);
//         // expect(response.body.error).toBe(null);
//     });
//     // it("should return datas", async () => {
//     //     const response = await request(baseURL).get("/");
//     //     expect(response.body.data.length >= 1).toBe(true);
//     // })
// });

// describe("POST /create-task", () => {
//     const newTask = {
//         id: "6759be",
//         title: "write vue code",
//         date: "2022/10/3"
//     }
//     afterAll(async () => {
//         await request(baseURL).delete(`/delete-task/${newTask.id}`)
//     })
//     it("should add an task to tasks array", async () => {
//         const response = await (await request(baseURL).post('/create-task')).send(newTask);
//         const lastTask = response.body.data[response.body.data.length - 1]
//         expect(response.statusCode).toBe(201);
//         expect(lastTask.title).toBe(newTask['title']);
//         expect(lastTask.data).toBe(newTask['date']);
//     });
// });

// describe("Update one task", () => {
//     const newTask = {
//         id: "6798re",
//         title: "write angular code",
//         data: "2023/1/2"
//     }

//     beforeAll(async () => {
//         await request(baseURL).put("/update-task").send(newTask);
//     })

//     afterAll(async () => {
//         await request(baseURL).delete(`/delete-task/${newTask.id}`)
//     })

//     it("should update task if it exists", async () => {
//         const response = await request(baseURL).put(`/update-task/${newTask.id}`).send({
//             title: "delete angular code",
//         });

//         expect(response.statusCode).toBe(201);
//         expect(response.body.data.title).toBe("delete angular code");
//     });
// });

describe("Delete one task", () => {
    const newTask = {
        id: "6798re",
        title: "write angular code",
        data: "2023/1/2",
    }
    beforeAll(async () => {
        await (await request(baseURL).post("/create-task")).send(newTask);
    })
    it("should delete one task", async () => {
        const response = await request(baseURL).delete(`/delete-task/${newTask.id}`);
        const tasks = response.body.data
        const exists = tasks.find(task => {
            newTask.id == taskId
        })
        expect(exists).toBe(undefined)
    });
});