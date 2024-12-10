class AsyncOperationHandler {
    private _fieldForDisplayError: string;
    private _fieldForDisplay: string;

    constructor(fieldForDisplayError?: string, fieldForDisplay?: string ) {
        this._fieldForDisplayError = fieldForDisplayError || '';
        this._fieldForDisplay = fieldForDisplay || '';
    }

    public async execute(operation: () => Promise<any>): Promise<void> {
        window.store.set({ isLoading: true });
        try {
            const response = await operation();
            if (typeof response === 'object' && response !== null) {
                const result = await JSON.parse((response as any).response);
                if (this._fieldForDisplay) {
                    window.store.set({ [this._fieldForDisplay]: result })
                }
                return result;
            }

            return response;
        } catch (error) {
            this.handleError(error);
        } finally {
            window.store.set({ isLoading: false });
        }
    }

    private handleError(error: any): void {
        if (error instanceof Error) {
            window.store.set({ [this._fieldForDisplayError]: error.message });
        } else if (error && typeof error === 'object' && 'response' in error) {
            const errorResponse = JSON.parse((error as any).response);
            if (errorResponse.status === 401) {
                window.router.go('/login');
            } else {
                window.store.set({ [this._fieldForDisplayError]: errorResponse.reason });
            }
        } else {
            window.store.set({ [this._fieldForDisplayError]: "Произошла непредвиденная ошибка" });
        }
    }
}

export default AsyncOperationHandler;
