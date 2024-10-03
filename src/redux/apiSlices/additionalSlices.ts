import { api } from "../api/baseApi";
import { ITermsAndPolicies } from "../interface/additional";
import { IDonationsStatus } from "../interface/donation";
import { IFAQs } from "../interface/faq";

export const additionalSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        getAboutSic: builder.query<ITermsAndPolicies,unknown>({
            query: ({id,page,limit}) => ({
                url: `/about-sic`,
              
            }),
            providesTags : ["additional"]
        }),
        getFAQ: builder.query<IFAQs,unknown>({
            query: ({id,page,limit}) => ({
                url: `/faqs`,
              
            }),
            providesTags : ["additional"]
        }),
        getTermsAndConditions: builder.query<ITermsAndPolicies,unknown>({
            query: ({id,page,limit}) => ({
                url: `/terms-and-conditions`,
              
            }),
            providesTags : ["additional",]
        }),
        getPrivacyPolicy: builder.query<ITermsAndPolicies,unknown>({
            query: ({id,page,limit}) => ({
                url: `/privacy-policy`,
              
            }),
            providesTags : ["additional",]
        }),
        getSicGuideLines: builder.query<ITermsAndPolicies,unknown>({
            query: ({id,page,limit}) => ({
                url: `/sic-guidelines`,
              
            }),
            providesTags : ["additional",]
        }),
        getDonation: builder.query<IDonationsStatus,unknown>({
            query: ({id,page,limit}) => ({
                url: `/donations`,
              
            }),
            providesTags : ["additional",]
        }),
        sendFeedBack: builder.mutation({
            query: (data) => ({
                url: `/feedbacks`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["additional"]
          }),
   
    }),
})


export const { 
    useGetAboutSicQuery,
    useGetFAQQuery,
    useGetTermsAndConditionsQuery,
    useGetPrivacyPolicyQuery,
    useGetSicGuideLinesQuery,
    useGetDonationQuery,
    useSendFeedBackMutation
    
 } = additionalSlices;