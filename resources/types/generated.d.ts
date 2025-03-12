declare namespace App {
export type UserQueueStatus = 'queued' | 'archived' | 'completed';
}
declare namespace App.Data {
export type UserQueueData = {
id: number;
name: string;
queue_number: number;
message: string;
admin_notes: string | null;
email: string;
status: App.UserQueueStatus;
};
}
