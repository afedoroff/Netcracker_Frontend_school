interface IProject {
    _id: string;
    projectName: string;
    description: string;
    creator: string;
    participants: [];
}

interface ITask {
    _id: string;
    taskName: string;
    status: string;
    priority: string;
    creatorID: string;
    description: string;
    participantID: any;
    type: string;
    component: string;
    createDate: Date;
    endDate: Date;
    startDate: Date;
    projectID: string;
    comment: IComment[];
    attachments: string[]
}

interface IComment {
    _id: string
    userID: any;
    text: string;
    createDate: Date;
}

interface IUser {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    type: string;
    avatar?: string,
    email: string,
    specialization: string
}


export type {IProject, ITask, IUser, IComment}
