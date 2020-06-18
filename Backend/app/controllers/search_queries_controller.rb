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


        if params[:search_type]
            uri_string = "https://tastedive.com/api/similar?q=#{params[:search_type]}:#{params[:name]}&info=1&k=375558-WillReev-I7J6U4X5"
        else
            uri_string = "https://tastedive.com/api/similar?q=#{params[:name]}&info=1&k=375558-WillReev-I7J6U4X5"
        end
        uri = URI.parse(uri_string)
        uri_response = Net::HTTP.get_response(uri)
        final_result = JSON.parse(uri_response.body)

        query.name = final_result["Similar"]["Info"][0]["Name"]
        query.search_type = final_result["Similar"]["Info"][0]["Type"]
        query.wTeaser = final_result["Similar"]["Info"][0]["wTeaser"]
        query.wUrl = final_result["Similar"]["Info"][0]["wUrl"] 
        query.yUrl = final_result["Similar"]["Info"][0]["yUrl"]  
        query.user_id = params[:user_id]

        query.save

        final_result["Similar"]["Results"].each do |recomendation|
            Recommendation.create({
                name: recomendation["Name"],
                search_type: recomendation["Type"], 
                wTeaser: recomendation["wTeaser"], 
                wUrl: recomendation["wUrl"], 
                yUrl: recomendation["yUrl"], 
                search_query_id: query.id})
        end
        
        redirect_to "http://localhost:3001/UserPage.html?username=#{params[:username]}&password=#{params[:password]}"
    end

    def destroy

        @query = SearchQuery.find(params[:id])
        @query.destroy

        redirect_to "http://localhost:3001/UserPage.html?username=#{params[:username]}&password=#{params[:password]}"
    end

end
