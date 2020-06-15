class UsersController < ApplicationController

    def index
        if params["search"]
          @user = User.where(`"username=? and password=?"#{params["search"]["username"]}", "#{params["password"]}"`)
          
          render json: @user
        else
          @users = User.all
          render json: @users
        end
    end

    def show
        search_query = SearchQuery.find(params[:id])
        render json: search_query
    end

    def create

    end

end
