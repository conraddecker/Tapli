class BarsController < ApplicationController
  def index
    @bars = Bar.all

    respond_to do |format|
      format.html
      format.json { render :json => @bars }
    end
  end

  def new
    @bar = Bar.new
  end

  def create
    bar = Bar.new(params[:bar]);
    bar.save

    respond_to do |format|
      format.html { redirect_to bars_path }
      format.json { render :json => bar }
    end
  end

  def show
    @bar = Bar.find(params[:id]);

    respond_to do |format|
      format.html
      format.json { render :json => @bar }
    end
  end

  def edit
    @bar = Bar.find(params[:id])
  end
  
  def update
    bar = Bar.find(params[:id]);
    bar.update_attributes(params[:bar]);

    respond_to do |format|
      format.html { redirect_to bar }
      format.json { render :json => bar }
    end
  end

  def destroy
    bar = Bar.find(params[:id])
    bar.destroy

    respond_to do |format|
      format.html { redirect_to bars_path }
      format.json { head :no_content }
    end
  end
end
