class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permittion_parameters, if: :devise_controller?

  protected
  def configure_permittion_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
