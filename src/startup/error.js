export default () => {
    process.on('unhandledRejection', (error) => {
        throw error;
    });
}