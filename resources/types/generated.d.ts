declare namespace App {
    export type UserQueueStatus = 'queued' | 'skipped' | 'archived' | 'completed';
}
declare namespace App.Data {
    export type UserQueueData = {
        id: number;
        name: string;
        queue_number: number;
        initial_queue_number: number;
        is_boosted: boolean;
        message: string;
        admin_notes: string | null;
        status: App.UserQueueStatus;
        likes_count: number;
        dislikes_count: number;
    };
}
