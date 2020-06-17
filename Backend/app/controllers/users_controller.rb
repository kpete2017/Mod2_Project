class UsersController < ApplicationController

  def index

      if params[:username]
        puts "MADE IT HERE SEE MEE"
        # @user = User.where(`"username=? and password=?","#{params["username"]}", "#{params["password"]}"`)
          @users = User.where(
          username: params[:username],
          password: params[:password]
        )
      else
        @users = User.all
      end

      render json: @users, include: [search_queries: {include: :recommendations}]
  end

  def show
      search_query = SearchQuery.find(params[:id])
      render json: search_query
  end

  def create
    user = User.new
    user.name = params[:name]
    user.username = params[:username]
    user.password = params[:password]
    user.save
    redirect_to "http://localhost:3001/UserPage.html?username=#{params[:username]}&password=#{params[:password]}"
  end

end
