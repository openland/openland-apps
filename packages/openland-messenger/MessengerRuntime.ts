export interface MessengerRuntime {
    
    // 
    // Notifications
    //

    onBadgeChanged(counter: number): void;
    displayNotification(title: string, body: string, chatId: string, image?: string): void;
}