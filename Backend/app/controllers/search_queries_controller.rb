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
        key = ENV['tastedive_api_key']
        query = SearchQuery.new


        if params[:search_type]
            uri_string = "https://tastedive.com/api/similar?q=#{params[:search_type]}:#{params[:name]}&info=1&k=#{key}"
        else
            uri_string = "https://tastedive.com/api/similar?q=#{params[:name]}&info=1&k=#{key}"
        end
        uri = URI.parse(uri_string)
        uri_response = Net::HTTP.get_response(uri)

        begin
            final_result = JSON.parse(uri_response.body)
          rescue Exception => e
            return redirect_to "http://localhost:3001/UserPage.html?username=#{params[:username]}&password=#{params[:password]}&error=e"
        end
    
        # final_result = JSON.parse(uri_response.body)

        if final_result["Similar"]["Info"][0]["wTeaser"] == nil
            return redirect_to "http://localhost:3001/UserPage.html?username=#{params[:username]}&password=#{params[:password]}&error=e"
        end

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
