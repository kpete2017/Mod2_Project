class SearchQueriesController < ApplicationController
    def index 
        @search_queries = SearchQuery.all
        render json: @search_queries, include: [:recommendations]
    end

    def show
        search_query = SearchQuery.find(params[:id])
        render json: search_query
    end

    def create

        query = SearchQuery.new

        uri_string = "https://tastedive.com/api/similar?q=#{params[:name]}&k=375558-WillReev-I7J6U4X5"
        uri = URI.parse(uri_string)
        uri_response = Net::HTTP.get_response(uri)
        final_result = JSON.parse(uri_response.body)

        query.name = final_result["Similar"]["Info"][0]["Name"]
        query.search_type = final_result["Similar"]["Info"][0]["Type"] 

        query.save

        final_result["Similar"]["Results"].each do |recomendation|
            Recommendation.create({name: recomendation["Name"], search_query_id: query.id})
        end

    end
end
