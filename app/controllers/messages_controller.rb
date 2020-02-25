class MessagesController < ApplicationController
  def index
  end

  def create(message_params)
    @message=Message.new
    if @message.save
      redirect_to group_message_index_path(params[:id]), notice: "メッセージが送信されました"
    else
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:name, :image, :user_id, :group_id)
  end

end
