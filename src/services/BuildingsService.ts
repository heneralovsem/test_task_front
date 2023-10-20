import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IBuilding } from '../types/types'


export const buildingsAPI = createApi({
    reducerPath: 'buildingsAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Building'],
    endpoints: (build) => ({
        fetchAllBuildings: build.query<IBuilding[], string>({
            query: () => ({
                url: `buildings`
            }),
            providesTags: result => ['Building']
        }),
        createBuilding: build.mutation({
            query: (building) => ({
                url: `buildings`,
                method: 'POST',
                body: building
            }),
            invalidatesTags: ['Building']
        })
    })
})