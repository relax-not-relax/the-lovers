import { createSlice } from "@reduxjs/toolkit";

const saveServiceToLocalStorage = (services) => {
    localStorage.setItem('services', JSON.stringify(services));
};

const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        serviceItems: [],
    },
    reducers: {
        addToServiceList(state, action) {
            const newItem = action.payload;
            const serviceList = [...state.serviceItems];
            serviceList.push(newItem);
            state.serviceItems = serviceList;
            saveServiceToLocalStorage(serviceList);
        },

        addScheduleToService(state, action) {
            const { index, startDate, endDate, price } = action.payload;
            if (index >= 0 && index < state.serviceItems.length) {
                const updatedServiceList = [...state.serviceItems];
                const serviceToUpdate = updatedServiceList[index];

                const newSchedule = { startDate, endDate, price };

                serviceToUpdate.serviceScheduler.push(newSchedule);

                state.serviceItems = updatedServiceList;
                saveServiceToLocalStorage(updatedServiceList);
            }
        },

        removeFromServiceList(state, action) {
            state.serviceItems = [];
            saveServiceToLocalStorage([]);
        },

        removeServiceSchedule(state, action) {
            const { serviceIndex, scheduleIndex } = action.payload;
            const updatedServices = [...state.serviceItems];
            if (serviceIndex >= 0 && serviceIndex < updatedServices.length) {
                const serviceToUpdate = updatedServices[serviceIndex];
                const updatedServiceScheduler = [...serviceToUpdate.serviceScheduler];

                if (scheduleIndex >= 0 && scheduleIndex < updatedServiceScheduler.length) {
                    updatedServiceScheduler.splice(scheduleIndex, 1);
                    serviceToUpdate.serviceScheduler = updatedServiceScheduler;

                    // Cập nhật lại mảng serviceScheduler trong mảng services
                    updatedServices[serviceIndex] = serviceToUpdate;

                    state.serviceItems = updatedServices;
                    saveServiceToLocalStorage(updatedServices);
                }
            }
        }


    }
});

const { actions, reducer } = serviceSlice;
export const { addToServiceList, addScheduleToService, removeFromServiceList, removeServiceSchedule } = actions;
export default reducer;